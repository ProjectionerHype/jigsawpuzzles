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

      // Classic interlocking jigsaw piece path.
      // Each tabbed edge is built from 5 segments: line, neck-out, bulb, neck-in, line.
      // The neck pinch + round bulb produces the iconic puzzle knob silhouette.
      const generatePath = () => {
        const path: string[] = [];
        path.push(`M 0,0`);

        // ---- TOP edge: travels right ----
        if (top === 0) {
          path.push(`l ${w},0`);
        } else {
          const sign = top === 1 ? -1 : 1;          // -1 = knob out (up), +1 = socket in (down)
          const tH = h * 0.22 * sign;                // knob height
          const lineLen = w * 0.36;                  // straight portion before knob on each side
          const neckW = w * 0.08;                    // neck width on each side
          const bulbW = w * 0.12;                    // half-width of the bulb
          path.push(`l ${lineLen},0`);
          // neck out (small s-curve out from edge)
          path.push(`c ${neckW * 0.5},0 ${neckW},${tH * 0.2} ${neckW},${tH * 0.4}`);
          // bulb top: large round arc up and over to mirror neck on other side
          path.push(`c 0,${tH * 0.5} ${bulbW * 2},${tH * 0.5} ${bulbW * 2},0`);
          // neck back in
          path.push(`c 0,${-tH * 0.2} ${neckW * 0.5},${-tH * 0.4} ${neckW},${-tH * 0.4}`);
          path.push(`l ${lineLen},0`);
        }

        // ---- RIGHT edge: travels down ----
        if (right === 0) {
          path.push(`l 0,${h}`);
        } else {
          const sign = right === 1 ? 1 : -1;         // +1 = knob out (right), -1 = socket in (left)
          const tW = w * 0.22 * sign;
          const lineLen = h * 0.36;
          const neckH = h * 0.08;
          const bulbH = h * 0.12;
          path.push(`l 0,${lineLen}`);
          path.push(`c 0,${neckH * 0.5} ${tW * 0.2},${neckH} ${tW * 0.4},${neckH}`);
          path.push(`c ${tW * 0.5},0 ${tW * 0.5},${bulbH * 2} 0,${bulbH * 2}`);
          path.push(`c ${-tW * 0.2},0 ${-tW * 0.4},${neckH * 0.5} ${-tW * 0.4},${neckH}`);
          path.push(`l 0,${lineLen}`);
        }

        // ---- BOTTOM edge: travels left ----
        if (bottom === 0) {
          path.push(`l ${-w},0`);
        } else {
          const sign = bottom === 1 ? 1 : -1;        // +1 = knob out (down), -1 = socket in (up)
          const tH = h * 0.22 * sign;
          const lineLen = w * 0.36;
          const neckW = w * 0.08;
          const bulbW = w * 0.12;
          path.push(`l ${-lineLen},0`);
          path.push(`c ${-neckW * 0.5},0 ${-neckW},${tH * 0.2} ${-neckW},${tH * 0.4}`);
          path.push(`c 0,${tH * 0.5} ${-bulbW * 2},${tH * 0.5} ${-bulbW * 2},0`);
          path.push(`c 0,${-tH * 0.2} ${-neckW * 0.5},${-tH * 0.4} ${-neckW},${-tH * 0.4}`);
          path.push(`l ${-lineLen},0`);
        }

        // ---- LEFT edge: travels up ----
        if (left === 0) {
          path.push(`l 0,${-h}`);
        } else {
          const sign = left === 1 ? -1 : 1;          // -1 = knob out (left), +1 = socket in (right)
          const tW = w * 0.22 * sign;
          const lineLen = h * 0.36;
          const neckH = h * 0.08;
          const bulbH = h * 0.12;
          path.push(`l 0,${-lineLen}`);
          path.push(`c 0,${-neckH * 0.5} ${tW * 0.2},${-neckH} ${tW * 0.4},${-neckH}`);
          path.push(`c ${tW * 0.5},0 ${tW * 0.5},${-bulbH * 2} 0,${-bulbH * 2}`);
          path.push(`c ${-tW * 0.2},0 ${-tW * 0.4},${-neckH * 0.5} ${-tW * 0.4},${-neckH}`);
          path.push(`l 0,${-lineLen}`);
        }

        path.push('Z');
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
