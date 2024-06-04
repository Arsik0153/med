export function calculateProximity(normStart, normEnd, value) {
    if (value < normStart) {
        return (value / normStart) * 100;
    } else if (value > normEnd) {
        return (normEnd / value) * 100;
    } else {
        return 100;
    }
}
