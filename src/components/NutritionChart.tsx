import React, { useEffect, useRef } from 'react';
import { NutritionCoverage } from '../types';

interface NutritionChartProps {
  nutritionData: NutritionCoverage;
}

export default function NutritionChart({ nutritionData }: NutritionChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 250;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Data
    const data = [
      { label: 'Calories', value: nutritionData.calories, color: '#3B82F6' },
      { label: 'Protein', value: nutritionData.protein, color: '#10B981' },
      { label: 'Iron', value: nutritionData.iron, color: '#EF4444' },
      { label: 'Calcium', value: nutritionData.calcium, color: '#8B5CF6' },
      { label: 'Vitamin A', value: nutritionData.vitaminA, color: '#F59E0B' },
      { label: 'Vitamin C', value: nutritionData.vitaminC, color: '#F97316' }
    ];

    // Chart dimensions
    const chartWidth = 350;
    const chartHeight = 180;
    const barWidth = 50;
    const barSpacing = 10;
    const startX = 25;
    const startY = 200;

    // Draw bars
    data.forEach((item, index) => {
      const x = startX + (barWidth + barSpacing) * index;
      const barHeight = (item.value / 100) * chartHeight;
      const y = startY - barHeight;

      // Draw bar
      ctx.fillStyle = item.color;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw percentage text on bar
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${item.value.toFixed(0)}%`, x + barWidth / 2, y + 20);

      // Draw label below bar
      ctx.fillStyle = '#374151';
      ctx.font = '10px Arial';
      ctx.fillText(item.label, x + barWidth / 2, startY + 15);
    });

    // Draw 100% reference line
    ctx.strokeStyle = '#D1D5DB';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(startX, startY - chartHeight);
    ctx.lineTo(startX + (barWidth + barSpacing) * data.length - barSpacing, startY - chartHeight);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw 100% label
    ctx.fillStyle = '#6B7280';
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('100%', startX + (barWidth + barSpacing) * data.length, startY - chartHeight + 4);

  }, [nutritionData]);

  return (
    <div className="flex justify-center">
      <canvas 
        ref={chartRef}
        className="max-w-full h-auto"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}