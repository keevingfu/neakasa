import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ContentTestingHub from './ContentTestingHub';
import SelfKOCAnalysis from './SelfKOCAnalysis';
import ContentIdeationPlanning from './ContentIdeationPlanning';
import ContentTestingExecution from './ContentTestingExecution';
import PerformanceAnalysisOptimization from './PerformanceAnalysisOptimization';
import ContentRefinementIteration from './ContentRefinementIteration';
import TestComparison from './TestComparison';
import NeakasaLeapProjectAnalysis from './NeakasaLeapProjectAnalysis';

const ContentTest: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ContentTestingHub />} />
        <Route path="self-koc" element={<SelfKOCAnalysis />} />
        <Route path="ideation" element={<ContentIdeationPlanning />} />
        <Route path="execution" element={<ContentTestingExecution />} />
        <Route path="performance" element={<PerformanceAnalysisOptimization />} />
        <Route path="refinement" element={<ContentRefinementIteration />} />
        <Route path="comparison" element={<TestComparison />} />
        <Route path="neakasa-leap" element={<NeakasaLeapProjectAnalysis />} />
      </Routes>
    </div>
  );
};

export default ContentTest;
