import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import { motion } from 'framer-motion';
import './InfoBox.css';

export default function InfoBox({ info }) {
  // HD Images
  const SUNNY_IMG = "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1600&q=80";
  const RAINY_IMG = "https://images.unsplash.com/photo-1508669599492-fd102379df98?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const COLD_IMG  = "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  let weatherImage = SUNNY_IMG;
  if (info.humidity > 80) {
    weatherImage = RAINY_IMG;
  } else if (info.temp < 15) {
    weatherImage = COLD_IMG;
  }

  const icon = info.humidity > 80 
    ? <ThunderstormIcon fontSize="large" /> 
    : info.temp > 15 
      ? <WbSunnyIcon fontSize="large" /> 
      : <AcUnitIcon fontSize="large" />;

  return (
    <motion.div 
      className="InfoBox" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
    >
      <Card sx={{ maxWidth: 500, borderRadius: '25px', overflow: 'hidden', boxShadow: 6 }}>
        <div style={{ position: "relative" }}>
          <CardMedia
            sx={{ height: 250 }}
            image={weatherImage}
            title="Weather Condition"
          />
          {/* Dark Overlay for visibility */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.25)"
          }}></div>
        </div>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{ display: "flex", alignItems: "center" }}>
            {info.city}
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              style={{ marginLeft: '10px' }}
            >
              {icon}
            </motion.span>
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <p>Temperature = {Math.round(info.temp)}°C</p>
            <p>Humidity = {info.humidity}%</p>
            <p>Feels Like = {Math.round(info.feelsLike)}°C</p>
            <p>Min Temperature = {Math.round(info.tempMin)}°C</p>
            <p>Max Temperature = {Math.round(info.tempMax)}°C</p>
            <p>The weather can be described as <i>{info.weather}</i>.</p>
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
