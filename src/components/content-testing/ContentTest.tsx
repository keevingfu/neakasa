import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ContentTestingHub from './ContentTestingHub';
import ContentIdeationPlanning from './ContentIdeationPlanning';
import ContentTestingExecution from './ContentTestingExecution';
import PerformanceAnalysisOptimization from './PerformanceAnalysisOptimization';
import ContentRefinementIteration from './ContentRefinementIteration';
import TestComparison from './TestComparison';

const ContentTest: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ContentTestingHub />} />
        <Route path="ideation" element={<ContentIdeationPlanning />} />
        <Route path="execution" element={<ContentTestingExecution />} />
        <Route path="performance" element={<PerformanceAnalysisOptimization />} />
        <Route path="refinement" element={<ContentRefinementIteration />} />
        <Route path="comparison" element={<TestComparison />} />
      </Routes>
    </div>
  );
};

export default ContentTest;
