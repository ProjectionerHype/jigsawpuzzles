import { useEffect, useState, useRef, useMemo } from "react";
import { useLocation, useSearch, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Shuffle, Eye, Lightbulb, CheckCircle2, Share2 } from "lucide-react";
import { PUZZLE_IMAGES, DIFFICULTIES } from "@/lib/images";
import { generatePuzzleShapes } from "@/lib/puzzle-generator";
import { playSnapSound } from "@/lib/audio";
import { markDayCompleted, getCurrentStreak, buildShareText, shareOrCopy } from "@/lib/daily-progress";

interface PuzzleStatePiece {
  id: string;
  r: number;
  c: number;
  x: number;
  y: number;
  groupId: string;
  isLocked: boolean;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function PlayPage() {
  const [location, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const imageId = searchParams.get("image") || "mountains";
  const piecesParam = parseInt(searchParams.get("pieces") || "24", 10);
  const isDailyRun = searchParams.get("daily") === "1";
  
  const image = PUZZLE_IMAGES.find(img => img.id === imageId) || PUZZLE_IMAGES[0];
  const difficulty = DIFFICULTIES.find(d => d.pieces === piecesParam) || DIFFICULTIES[1];
  
  const [boardSize, setBoardSize] = useState({ w: 0, h: 0 });
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [isReady, setIsReady] = useState(false);
  const [pieces, setPieces] = useState<PuzzleStatePiece[]>([]);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [hintPieceId, setHintPieceId] = useState<string | null>(null);
  const [shareLabel, setShareLabel] = useState<string>("Share Result");

  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  
  // Animation frames for dragging
  const dragRef = useRef<{
    active: boolean;
    groupId: string | null;
    startX: number;
    startY: number;
    initialPieces: { id: string, x: number, y: number }[];
  }>({ active: false, groupId: null, startX: 0, startY: 0, initialPieces: [] });

  // SVG shapes (memoized so we don't recalculate paths constantly)
  const pieceShapes = useMemo(() => {
    if (!boardSize.w || !boardSize.h) return [];
    const pieceW = boardSize.w / difficulty.cols;
    const pieceH = boardSize.h / difficulty.rows;
    return generatePuzzleShapes(difficulty.cols, difficulty.rows, pieceW, pieceH);
  }, [difficulty.cols, difficulty.rows, boardSize.w, boardSize.h]);

  // Init puzzle
  useEffect(() => {
    document.title = `${image.title} - Free Online Jigsaw Puzzle Game`;
    
    // Determine board size based on screen
    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setContainerSize({ w: Math.floor(rect.width), h: Math.floor(rect.height) });

      const targetAspect = 4 / 3;
      // Use most of the available space for the board; pieces will scatter in
      // the surrounding margin (or overlap the board on tight screens).
      const isMobile = rect.width < 768;
      const sideMargin = isMobile ? 24 : 60;
      const vertMargin = isMobile ? 24 : 50;

      const availW = Math.max(200, rect.width - sideMargin * 2);
      const availH = Math.max(200, rect.height - vertMargin * 2);

      let w = availW;
      let h = w / targetAspect;
      if (h > availH) {
        h = availH;
        w = h * targetAspect;
      }

      // Round board dims down to exact multiples of cols/rows so each piece
      // gets an integer cell size and there are no sub-pixel gaps at the seams.
      const cols = difficulty.cols;
      const rows = difficulty.rows;
      const finalW = Math.floor(w / cols) * cols;
      const finalH = Math.floor(h / rows) * rows;
      setBoardSize({ w: finalW, h: finalH });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [image, difficulty.cols, difficulty.rows]);

  // Generate initial pieces once board is sized
  useEffect(() => {
    if (!boardSize.w || !boardSize.h || !containerSize.w || !containerSize.h || isReady) return;

    const pieceW = boardSize.w / difficulty.cols;
    const pieceH = boardSize.h / difficulty.rows;

    // Margins around the board (in board-relative coordinates).
    // Board top-left in container coords = (containerW/2 - boardW/2, containerH/2 - boardH/2).
    // So x in board coords goes from -leftMargin (visible left edge) to boardW + rightMargin (visible right edge).
    const leftMargin = (containerSize.w - boardSize.w) / 2;
    const rightMargin = leftMargin;
    const topMargin = (containerSize.h - boardSize.h) / 2;
    const bottomMargin = topMargin;

    const safe = 6; // safety inset from edges
    const gap = 8;  // gap from board edge when off-board scatter is possible

    // Visible bounds in board-relative coordinates
    const minX = -leftMargin + safe;
    const maxX = boardSize.w + rightMargin - pieceW - safe;
    const minY = -topMargin + safe;
    const maxY = boardSize.h + bottomMargin - pieceH - safe;

    type Zone = { name: 'left' | 'right' | 'top' | 'bottom'; capacity: number };
    const zones: Zone[] = [];

    const zoneCap = (zoneW: number, zoneH: number) =>
      Math.max(1, Math.floor((zoneW * zoneH) / (pieceW * pieceH * 1.4)));

    if (leftMargin > pieceW + gap + safe) {
      zones.push({ name: 'left', capacity: zoneCap(leftMargin - gap - safe, containerSize.h - safe * 2) });
    }
    if (rightMargin > pieceW + gap + safe) {
      zones.push({ name: 'right', capacity: zoneCap(rightMargin - gap - safe, containerSize.h - safe * 2) });
    }
    if (topMargin > pieceH + gap + safe) {
      zones.push({ name: 'top', capacity: zoneCap(containerSize.w - safe * 2, topMargin - gap - safe) });
    }
    if (bottomMargin > pieceH + gap + safe) {
      zones.push({ name: 'bottom', capacity: zoneCap(containerSize.w - safe * 2, bottomMargin - gap - safe) });
    }

    // Build a flat list of slots, weighted by capacity, then shuffle.
    const slots: Zone['name'][] = [];
    zones.forEach(z => { for (let i = 0; i < z.capacity; i++) slots.push(z.name); });
    for (let i = slots.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [slots[i], slots[j]] = [slots[j], slots[i]];
    }

    const allCells: { r: number; c: number }[] = [];
    for (let r = 0; r < difficulty.rows; r++) {
      for (let c = 0; c < difficulty.cols; c++) allCells.push({ r, c });
    }
    for (let i = allCells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allCells[i], allCells[j]] = [allCells[j], allCells[i]];
    }

    const rand = (min: number, max: number) => min + Math.random() * Math.max(0, max - min);

    const initialPieces: PuzzleStatePiece[] = allCells.map((cell, idx) => {
      let x = 0, y = 0;

      if (slots.length > 0) {
        const zoneName = slots[idx % slots.length];
        if (zoneName === 'left') {
          x = rand(minX, -pieceW - gap);
          y = rand(minY, maxY);
        } else if (zoneName === 'right') {
          x = rand(boardSize.w + gap, maxX);
          y = rand(minY, maxY);
        } else if (zoneName === 'top') {
          x = rand(minX, maxX);
          y = rand(minY, -pieceH - gap);
        } else { // bottom
          x = rand(minX, maxX);
          y = rand(boardSize.h + gap, maxY);
        }
      } else {
        // No off-board zone fits — scatter anywhere visible (may overlap board)
        x = rand(minX, maxX);
        y = rand(minY, maxY);
      }

      return {
        id: `${cell.r}-${cell.c}`,
        r: cell.r, c: cell.c,
        x, y,
        groupId: `${cell.r}-${cell.c}`,
        isLocked: false,
      };
    });

    setPieces(initialPieces);
    setIsReady(true);
  }, [boardSize, containerSize, difficulty, isReady]);

  // Timer
  useEffect(() => {
    if (!isPlaying || isSolved || !isReady) return;
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, isSolved, isReady]);

  // Drag interaction
  const handlePointerDown = (e: React.PointerEvent, piece: PuzzleStatePiece) => {
    if (piece.isLocked || isSolved) return;
    
    (e.target as Element).setPointerCapture(e.pointerId);
    e.stopPropagation();

    // Bring group to top by moving them to the end of the array
    setPieces(prev => {
      const groupPieces = prev.filter(p => p.groupId === piece.groupId);
      const otherPieces = prev.filter(p => p.groupId !== piece.groupId);
      
      dragRef.current = {
        active: true,
        groupId: piece.groupId,
        startX: e.clientX,
        startY: e.clientY,
        initialPieces: groupPieces.map(p => ({ id: p.id, x: p.x, y: p.y }))
      };
      
      return [...otherPieces, ...groupPieces];
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active || !dragRef.current.groupId) return;
    e.preventDefault();

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    setPieces(prev => prev.map(p => {
      if (p.groupId === dragRef.current.groupId) {
        const initial = dragRef.current.initialPieces.find(ip => ip.id === p.id);
        if (initial) {
          return { ...p, x: initial.x + dx, y: initial.y + dy };
        }
      }
      return p;
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current.active || !dragRef.current.groupId) return;
    
    (e.target as Element).releasePointerCapture(e.pointerId);
    const groupId = dragRef.current.groupId;
    dragRef.current.active = false;
    dragRef.current.groupId = null;

    setPieces(prev => {
      const newPieces = [...prev];
      const groupPieces = newPieces.filter(p => p.groupId === groupId);
      if (groupPieces.length === 0) return prev;

      const pieceW = boardSize.w / difficulty.cols;
      const pieceH = boardSize.h / difficulty.rows;
      
      let snapped = false;

      // 1. Check snap to board
      // A group snaps to board if ANY piece in it is close to its target
      const boardSnapDist = 25;
      for (const p of groupPieces) {
        const targetX = p.c * pieceW;
        const targetY = p.r * pieceH;
        if (Math.abs(p.x - targetX) < boardSnapDist && Math.abs(p.y - targetY) < boardSnapDist) {
          // Snap whole group to locked position
          const dx = targetX - p.x;
          const dy = targetY - p.y;
          
          groupPieces.forEach(gp => {
            gp.x += dx;
            gp.y += dy;
            gp.isLocked = true;
          });
          
          snapped = true;
          break;
        }
      }

      // 2. Check snap to other pieces
      if (!snapped) {
        const pieceSnapDist = 20;
        
        for (const p of groupPieces) {
          if (snapped) break;
          
          // Find potential neighbors
          const neighbors = newPieces.filter(op => 
            op.groupId !== groupId && 
            ((Math.abs(op.r - p.r) === 1 && op.c === p.c) || (Math.abs(op.c - p.c) === 1 && op.r === p.r))
          );
          
          for (const n of neighbors) {
            // Calculate where p SHOULD be relative to n
            const expectedDx = (p.c - n.c) * pieceW;
            const expectedDy = (p.r - n.r) * pieceH;
            
            const expectedX = n.x + expectedDx;
            const expectedY = n.y + expectedDy;
            
            if (Math.abs(p.x - expectedX) < pieceSnapDist && Math.abs(p.y - expectedY) < pieceSnapDist) {
              // Snap whole group to n's group
              const dx = expectedX - p.x;
              const dy = expectedY - p.y;
              
              const newGroupId = n.groupId;
              const isNowLocked = n.isLocked; // if snapping to a locked piece, group locks
              
              groupPieces.forEach(gp => {
                gp.x += dx;
                gp.y += dy;
                gp.groupId = newGroupId;
                if (isNowLocked) gp.isLocked = true;
              });
              
              snapped = true;
              break;
            }
          }
        }
      }

      if (snapped) {
        playSnapSound();
      }

      // Check win condition
      const allLocked = newPieces.every(p => p.isLocked);
      if (allLocked && !isSolved) {
        setTimeout(() => setIsSolved(true), 500);
        // Save best time
        const key = `jigscape_best_${image.id}_${difficulty.pieces}`;
        const best = localStorage.getItem(key);
        if (!best || time < parseInt(best, 10)) {
          localStorage.setItem(key, time.toString());
        }
        // Mark today's daily puzzle as completed
        if (isDailyRun) {
          markDayCompleted();
        }
      }

      return newPieces;
    });
  };

  const handleShuffle = () => {
    if (!boardSize.w || !containerSize.w) return;
    const pW = boardSize.w / difficulty.cols;
    const pH = boardSize.h / difficulty.rows;
    const lm = (containerSize.w - boardSize.w) / 2;
    const tm = (containerSize.h - boardSize.h) / 2;
    const safe = 6, gap = 8;

    const minX = -lm + safe;
    const maxX = boardSize.w + lm - pW - safe;
    const minY = -tm + safe;
    const maxY = boardSize.h + tm - pH - safe;

    type ZName = 'left' | 'right' | 'top' | 'bottom';
    const allowed: ZName[] = [];
    if (lm > pW + gap + safe) { allowed.push('left'); allowed.push('right'); }
    if (tm > pH + gap + safe) { allowed.push('top'); allowed.push('bottom'); }

    const rand = (min: number, max: number) => min + Math.random() * Math.max(0, max - min);

    setPieces(prev => prev.map(p => {
      if (p.isLocked) return p;
      let x = 0, y = 0;
      if (allowed.length === 0) {
        x = rand(minX, maxX);
        y = rand(minY, maxY);
      } else {
        const zone = allowed[Math.floor(Math.random() * allowed.length)];
        if (zone === 'left') {
          x = rand(minX, -pW - gap);
          y = rand(minY, maxY);
        } else if (zone === 'right') {
          x = rand(boardSize.w + gap, maxX);
          y = rand(minY, maxY);
        } else if (zone === 'top') {
          x = rand(minX, maxX);
          y = rand(minY, -pH - gap);
        } else {
          x = rand(minX, maxX);
          y = rand(boardSize.h + gap, maxY);
        }
      }
      return { ...p, x, y };
    }));
  };

  const handleHint = () => {
    if (hintsLeft <= 0 || isSolved) return;
    
    // Find a random unlocked piece
    const unlocked = pieces.filter(p => !p.isLocked);
    if (unlocked.length === 0) return;
    
    const target = unlocked[Math.floor(Math.random() * unlocked.length)];
    setHintsLeft(h => h - 1);
    setHintPieceId(target.id);
    
    setTimeout(() => setHintPieceId(null), 2000);
  };

  const pieceW = boardSize.w ? boardSize.w / difficulty.cols : 0;
  const pieceH = boardSize.h ? boardSize.h / difficulty.rows : 0;
  const lockedCount = pieces.filter(p => p.isLocked).length;

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden relative">
      {/* Controls Bar */}
      <div className="glass-bar py-3 px-4 z-20 relative">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/gallery" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1">
              &larr; Gallery
            </Link>
            
            <div className="flex items-center gap-4 text-foreground font-mono font-medium bg-secondary/50 px-4 py-1.5 rounded-full">
              <span className="flex items-center gap-2 w-20">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-green-500 animate-pulse" : "bg-muted-foreground"}`}></span>
                {formatTime(time)}
              </span>
              <span className="w-px h-4 bg-border"></span>
              <span>{lockedCount} / {difficulty.pieces}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors"
              title={isPlaying ? "Pause" : "Resume"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button 
              onClick={handleShuffle}
              className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors"
              title="Shuffle unplaced pieces"
            >
              <Shuffle size={20} />
            </button>
            <button
              onMouseEnter={() => setShowPreview(true)}
              onMouseLeave={() => setShowPreview(false)}
              onFocus={() => setShowPreview(true)}
              onBlur={() => setShowPreview(false)}
              className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors hover:text-primary"
              title="Hover to see the finished picture"
              aria-label="Preview finished picture"
            >
              <Eye size={20} />
            </button>
            <button 
              onClick={handleHint}
              disabled={hintsLeft === 0}
              className={`p-2 rounded-full transition-colors flex items-center gap-1 ${hintsLeft > 0 ? "hover:bg-secondary text-foreground" : "text-muted-foreground opacity-50"}`}
              title="Hint"
            >
              <Lightbulb size={20} />
              <span className="text-xs font-bold">{hintsLeft}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Play Area */}
      <div 
        ref={containerRef} 
        className="play-stage flex-1 relative overflow-hidden flex items-center justify-center p-4 touch-none"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Board Outline */}
        <div 
          ref={boardRef}
          className="puzzle-board relative transition-opacity duration-1000"
          style={{ 
            width: boardSize.w, 
            height: boardSize.h,
            opacity: isSolved ? 0 : 1
          }}
        >
          {showPreview && (
            <img
              src={image.url}
              alt={`${image.title} reference`}
              className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none rounded-sm"
            />
          )}
        </div>

        {/* The Pieces */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2" style={{ transform: `translate(-${boardSize.w/2}px, -${boardSize.h/2}px)` }}>
            {pieces.map((piece) => {
              const shape = pieceShapes.find(s => s.id === piece.id);
              if (!shape) return null;

              const isDragged = dragRef.current.groupId === piece.groupId;
              const isHinted = piece.id === hintPieceId;
              
              // Calculate SVG bounding box to account for tabs
              const overflow = Math.max(pieceW, pieceH) * 0.4;
              const svgW = pieceW + overflow * 2;
              const svgH = pieceH + overflow * 2;

              return (
                <div
                  key={piece.id}
                  className={`absolute pointer-events-auto will-change-transform ${piece.isLocked ? 'z-10' : isDragged ? 'z-50' : 'z-20 cursor-grab active:cursor-grabbing'}`}
                  style={{
                    width: svgW,
                    height: svgH,
                    transform: `translate3d(${piece.x - overflow}px, ${piece.y - overflow}px, 0)`,
                  }}
                  onPointerDown={(e) => handlePointerDown(e, piece)}
                >
                  <motion.svg 
                    width={svgW} 
                    height={svgH}
                    animate={{
                      scale: isDragged ? 1.05 : 1,
                      rotate: isDragged ? 1 : 0,
                      filter: piece.isLocked 
                        ? isSolved ? 'drop-shadow(0px 0px 0px rgba(0,0,0,0))' : 'drop-shadow(0px 1px 2px rgba(0,0,0,0.2))' 
                        : isDragged 
                          ? 'drop-shadow(0px 15px 15px rgba(0,0,0,0.2))' 
                          : 'drop-shadow(0px 4px 6px rgba(0,0,0,0.15))'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <defs>
                      <clipPath id={`clip-${piece.id}`}>
                        <path d={shape.pathData} transform={`translate(${overflow}, ${overflow})`} />
                      </clipPath>
                    </defs>
                    <image 
                      href={image.url} 
                      x={overflow - piece.c * pieceW} 
                      y={overflow - piece.r * pieceH} 
                      width={boardSize.w} 
                      height={boardSize.h} 
                      preserveAspectRatio="none"
                      clipPath={`url(#clip-${piece.id})`}
                    />
                    
                    {/* Edge highlight/shadow */}
                    <motion.path 
                      d={shape.pathData} 
                      transform={`translate(${overflow}, ${overflow})`}
                      fill="none" 
                      stroke={isHinted ? "#10b981" : "rgba(0,0,0,0.3)"} 
                      strokeWidth={isHinted ? 4 : piece.isLocked ? 0.5 : 1.5}
                      animate={{ opacity: isSolved ? 0 : 1 }}
                      transition={{ duration: 1 }}
                    />
                    {isHinted && (
                      <path 
                        d={shape.pathData} 
                        transform={`translate(${overflow}, ${overflow})`}
                        fill="rgba(16, 185, 129, 0.3)" 
                      />
                    )}
                  </motion.svg>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pause Overlay */}
        {!isPlaying && !isSolved && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="text-center bg-card p-8 rounded-2xl shadow-xl border border-border">
              <h2 className="text-3xl font-serif font-bold mb-4">Paused</h2>
              <button 
                onClick={() => setIsPlaying(true)}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Resume
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {isSolved && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="bg-card p-8 rounded-3xl shadow-2xl border border-border max-w-sm w-full mx-4 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-accent to-primary" />
              
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle2 size={40} />
              </div>
              
              <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Beautifully Done</h2>
              <p className="text-muted-foreground mb-8">You completed the {difficulty.name} puzzle.</p>
              
              <div className="bg-secondary/50 rounded-xl p-4 mb-8">
                <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium mb-1">Time</div>
                <div className="text-3xl font-mono font-bold text-foreground">{formatTime(time)}</div>
              </div>
              
              <div className="flex flex-col gap-3">
                {isDailyRun && (
                  <button
                    onClick={async () => {
                      const text = buildShareText({
                        puzzleTitle: image.title,
                        difficultyName: difficulty.name,
                        timeSeconds: time,
                        streak: getCurrentStreak(),
                      });
                      const result = await shareOrCopy(text);
                      if (result === "copied") setShareLabel("Copied!");
                      else if (result === "shared") setShareLabel("Shared!");
                      else setShareLabel("Could not share");
                      setTimeout(() => setShareLabel("Share Result"), 2000);
                    }}
                    className="w-full bg-accent text-accent-foreground py-3 rounded-xl font-medium hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 size={18} />
                    {shareLabel}
                  </button>
                )}
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Play Again
                </button>
                <Link 
                  href={isDailyRun ? "/Daily-Jigsaw-Puzzle" : "/gallery"}
                  className="w-full bg-background border border-border text-foreground py-3 rounded-xl font-medium hover:bg-secondary transition-colors block"
                >
                  {isDailyRun ? "Back to Daily" : "Pick New Puzzle"}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
