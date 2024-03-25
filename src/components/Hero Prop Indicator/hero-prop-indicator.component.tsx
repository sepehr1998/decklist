import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

interface HeroPropIndicatorProps {
    value: number;
    color: "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

const HeroPropIndicator: React.FC<HeroPropIndicatorProps> = ({ value, color }) => {
    // Calculate the progress percentage
    const progress = typeof value === 'number' ? (value / 10) * 100 : 0;

    return (
        <Box sx={{ backgroundColor: 'white' }} position="relative" display="inline-flex" alignItems="center" justifyContent="center" >
            <CircularProgress
                variant="determinate"
                value={100}
                size={40}
                thickness={3}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '50px',
                    color: 'rgba(0, 0, 0, 0.1)', // Color of the empty portion
                    position: 'absolute',
                    zIndex: 0, // Ensure it's behind the progress bar
                }}
            />
            {/* Progress bar */}
            <CircularProgress
                data-testid="progress-bar"
                variant="determinate"
                color={color}
                value={progress}
                size={40}
                thickness={3}
                sx={{
                    position: 'absolute',
                    zIndex: 1, // Ensure it's on top of the full circle
                }}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {value}
                </Typography>
            </Box>
        </Box>
    );
};

export default HeroPropIndicator;
