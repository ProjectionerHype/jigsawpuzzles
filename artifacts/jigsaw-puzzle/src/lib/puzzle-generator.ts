export interface PieceShape {
  id: string;
  row: number;
  col: number;
  pathData: string;
  connections: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export function generatePuzzleShapes(cols: number, rows: number, pieceWidth: number, pieceHeight: number): PieceShape[] {
  const horizontalEdges: number[][] = [];
  const verticalEdges: number[][] = [];

  for (let r = 0; r < rows; r++) {
    horizontalEdges[r] = [];
    for (let c = 0; c < cols - 1; c++) {
      horizontalEdges[r][c] = Math.random() > 0.5 ? 1 : -1;
    }
  }

  for (let r = 0; r < rows - 1; r++) {
    verticalEdges[r] = [];
    for (let c = 0; c < cols; c++) {
      verticalEdges[r][c] = Math.random() > 0.5 ? 1 : -1;
    }
  }

  const pieces: PieceShape[] = [];
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const top = r === 0 ? 0 : -verticalEdges[r - 1][c];
      const right = c === cols - 1 ? 0 : horizontalEdges[r][c];
      const bottom = r === rows - 1 ? 0 : verticalEdges[r][c];
      const left = c === 0 ? 0 : -horizontalEdges[r][c - 1];

      const w = pieceWidth;
      const h = pieceHeight;
      const tW = w * 0.25;
      const tH = h * 0.25;
      
      const generatePath = () => {
         const path = [];
         path.push(`M 0,0`);
         
         // Top edge
         if (top === 0) path.push(`l ${w},0`);
         else {
           const t = top === 1 ? -tH : tH;
           path.push(`c ${w*0.2},0 ${w*0.2},${t} ${w*0.5},${t} c ${w*0.3},0 ${w*0.3},${-t} ${w*0.5},${-t}`);
         }
         
         // Right edge
         if (right === 0) path.push(`l 0,${h}`);
         else {
           const t = right === 1 ? tW : -tW;
           path.push(`c 0,${h*0.2} ${t},${h*0.2} ${t},${h*0.5} c 0,${h*0.3} ${-t},${h*0.3} ${-t},${h*0.5}`);
         }
         
         // Bottom edge
         if (bottom === 0) path.push(`l ${-w},0`);
         else {
           const t = bottom === 1 ? tH : -tH;
           path.push(`c ${-w*0.2},0 ${-w*0.2},${t} ${-w*0.5},${t} c ${-w*0.3},0 ${-w*0.3},${-t} ${-w*0.5},${-t}`);
         }
         
         // Left edge
         if (left === 0) path.push(`l 0,${-h}`);
         else {
           const t = left === 1 ? -tW : tW;
           path.push(`c 0,${-h*0.2} ${t},${-h*0.2} ${t},${-h*0.5} c 0,${-h*0.3} ${-t},${-h*0.3} ${-t},${-h*0.5}`);
         }
         
         return path.join(' ');
      };

      pieces.push({
        id: `${r}-${c}`,
        row: r,
        col: c,
        pathData: generatePath(),
        connections: { top, right, bottom, left }
      });
    }
  }

  return pieces;
}
