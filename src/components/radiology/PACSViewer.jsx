// src/components/radiology/PACSViewer.jsx
import React, { useState } from 'react';
import { Image, ZoomIn, ZoomOut, RotateCw, FlipHorizontal, FlipVertical, LayoutGrid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../common/Card';

const PACSViewer = () => {
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [layout, setLayout] = useState('1x1');

  const studies = [
    { id: 'ST-001', patient: 'John Smith', modality: 'CT', description: 'Chest CT with Contrast', date: '2024-03-19', images: 120, series: 3 },
    { id: 'ST-002', patient: 'Emily Davis', modality: 'MRI', description: 'Brain MRI T1/T2', date: '2024-03-19', images: 80, series: 2 },
    { id: 'ST-003', patient: 'Robert Wilson', modality: 'X-Ray', description: 'Chest X-Ray PA/Lateral', date: '2024-03-18', images: 2, series: 1 },
    { id: 'ST-004', patient: 'Lisa Anderson', modality: 'CT', description: 'Abdomen CT', date: '2024-03-18', images: 150, series: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">PACS Viewer</h1>
          <p className="text-gray-500 mt-1">DICOM image viewing and manipulation</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Study List */}
        <Card className="lg:col-span-1 overflow-auto">
          <div className="space-y-3">
            {studies.map((study) => (
              <div 
                key={study.id}
                onClick={() => setSelectedStudy(study)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedStudy?.id === study.id ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">{study.modality}</span>
                  <span className="text-xs text-gray-500">{study.date}</span>
                </div>
                <p className="font-medium text-sm text-gray-900">{study.patient}</p>
                <p className="text-xs text-gray-600 mt-1">{study.description}</p>
                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  <span>{study.images} images</span>
                  <span>{study.series} series</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Viewer */}
        <Card className="lg:col-span-3 flex flex-col">
          {selectedStudy ? (
            <>
              {/* Toolbar */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedStudy.patient}</h3>
                  <p className="text-sm text-gray-500">{selectedStudy.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setZoom(z => Math.max(25, z-25))} className="p-2 hover:bg-gray-100 rounded-lg">
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-medium w-16 text-center">{zoom}%</span>
                  <button onClick={() => setZoom(z => Math.min(400, z+25))} className="p-2 hover:bg-gray-100 rounded-lg">
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-2"></div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <RotateCw className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <FlipHorizontal className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <FlipVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Image Viewport */}
              <div className="flex-1 bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="text-center text-gray-500">
                  <Image className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">DICOM Viewer</p>
                  <p className="text-sm">{selectedStudy.modality} - {selectedStudy.images} images</p>
                  <p className="text-xs mt-4">Image viewing area with full DICOM support</p>
                </div>
                
                {/* Navigation Overlays */}
                <button className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Series Thumbnails */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-500">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select a study to view</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PACSViewer;