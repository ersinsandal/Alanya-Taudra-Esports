'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Check, Loader2 } from 'lucide-react';

interface ImageCropperModalProps {
  imageSrc: string;
  isOpen: boolean;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => Promise<void> | void;
}

const VIEWPORT_SIZE = 320;
const CROP_SIZE = 240;
const OUTPUT_SIZE = 512;

export function ImageCropperModal({
  imageSrc,
  isOpen,
  onClose,
  onCropComplete
}: ImageCropperModalProps) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isSaving, setIsSaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load image
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImage(img);
      setZoom(1);
      setPan({ x: 0, y: 0 });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Compute base scale so image covers the crop area
  const getBaseScale = useCallback(() => {
    if (!image) return 1;
    return Math.max(CROP_SIZE / image.naturalWidth, CROP_SIZE / image.naturalHeight);
  }, [image]);

  const currentScale = (getBaseScale() * zoom);

  // Draw viewport canvas
  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, VIEWPORT_SIZE, VIEWPORT_SIZE);

    // Draw image centered with pan & zoom
    ctx.save();
    ctx.translate(VIEWPORT_SIZE / 2 + pan.x, VIEWPORT_SIZE / 2 + pan.y);
    ctx.scale(currentScale, currentScale);
    ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
    ctx.restore();

    // Dark overlay with circular cutout
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.beginPath();
    ctx.rect(0, 0, VIEWPORT_SIZE, VIEWPORT_SIZE);
    ctx.arc(VIEWPORT_SIZE / 2, VIEWPORT_SIZE / 2, CROP_SIZE / 2, 0, Math.PI * 2, true);
    ctx.fill();

    // Red guide circle
    ctx.beginPath();
    ctx.arc(VIEWPORT_SIZE / 2, VIEWPORT_SIZE / 2, CROP_SIZE / 2, 0, Math.PI * 2);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#FF1F2D';
    ctx.stroke();
    ctx.restore();
  }, [image, pan, zoom, currentScale]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Reset positioning
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Perform final crop export
  const handleConfirmCrop = async () => {
    if (!image) return;
    setIsSaving(true);

    try {
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = OUTPUT_SIZE;
      exportCanvas.height = OUTPUT_SIZE;
      const ctx = exportCanvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      const ratio = OUTPUT_SIZE / CROP_SIZE;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.save();
      ctx.translate(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2);
      ctx.translate(pan.x * ratio, pan.y * ratio);
      ctx.scale(currentScale * ratio, currentScale * ratio);
      ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
      ctx.restore();

      exportCanvas.toBlob(async (blob) => {
        if (!blob) {
          alert('Kırpma işlemi başarısız oldu.');
          setIsSaving(false);
          return;
        }

        const croppedFile = new File([blob], `avatar-${Date.now()}.jpg`, { type: 'image/jpeg' });
        try {
          await onCropComplete(croppedFile);
          onClose();
        } catch (err) {
          console.error(err);
          alert('Fotoğraf kaydedilirken hata oluştu.');
        } finally {
          setIsSaving(false);
        }
      }, 'image/jpeg', 0.92);
    } catch (err) {
      console.error(err);
      setIsSaving(false);
      alert('Fotoğraf işlenirken hata oluştu.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#111114] border border-white/10 rounded-2xl w-full max-w-md p-6 relative shadow-2xl flex flex-col items-center">
        {/* Close Button */}
        <button 
          onClick={onClose}
          disabled={isSaving}
          className="absolute top-4 right-4 text-white/50 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h3 className="text-xl font-bold font-heading text-white mb-1">Fotoğrafı Kırp & Ayarla</h3>
        <p className="text-xs text-secondary-text text-center mb-5">
          Fotoğrafı sürükleyerek kırmızı daireye hizalayın ve yakınlaştırmayı ayarlayın.
        </p>

        {/* Viewport Canvas with interactive drag */}
        <div 
          className="relative rounded-2xl overflow-hidden border border-white/15 bg-black cursor-grab active:cursor-grabbing shadow-inner select-none touch-none"
          style={{ width: VIEWPORT_SIZE, height: VIEWPORT_SIZE }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <canvas 
            ref={canvasRef} 
            width={VIEWPORT_SIZE} 
            height={VIEWPORT_SIZE} 
            className="w-full h-full block"
          />
        </div>

        {/* Controls: Zoom slider & Reset */}
        <div className="w-full max-w-[320px] mt-4 space-y-3">
          <div className="flex items-center gap-3 text-white text-xs">
            <ZoomOut className="w-4 h-4 text-gray-400 shrink-0" />
            <input 
              type="range" 
              min="1" 
              max="3" 
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 accent-primary-red h-1.5 bg-white/10 rounded-lg cursor-pointer"
            />
            <ZoomIn className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="font-mono text-xs w-9 text-right text-white/80">{zoom.toFixed(1)}x</span>
          </div>

          <div className="flex justify-between items-center pt-1">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded bg-white/5 border border-white/5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Ortala / Sıfırla
            </button>
            <span className="text-[11px] text-gray-400">Daire içerisi profil fotoğrafınız olacaktır</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full max-w-[320px] mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors disabled:opacity-50"
          >
            Vazgeç
          </button>
          <button
            type="button"
            onClick={handleConfirmCrop}
            disabled={isSaving}
            className="flex-1 py-2.5 rounded-xl bg-primary-red hover:bg-deep-red text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(208,0,0,0.3)] flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            Kırp & Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
