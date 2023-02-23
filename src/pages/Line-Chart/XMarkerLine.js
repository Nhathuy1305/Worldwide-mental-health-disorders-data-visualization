export const XMarkerLine = ({ value, xScale, innerHeight, label }) => {
    const markerLineX = xScale(value);
    const markerLineY1 = 0;
    const markerLineY2 = innerHeight;
    return (
        <>
            <line
                class="marker-line"
                x1={markerLineX}
                y1={markerLineY1}
                x2={markerLineX}
                y2={markerLineY2}
            />
            <text
                text-anchor="middle"
                alignment-baseline="hanging"
                x={markerLineX}
                y={markerLineY2 + 8}
            >
                {label}
            </text>
        </>
    );
};