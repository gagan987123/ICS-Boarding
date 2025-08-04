import React, { useState, useEffect, useCallback } from 'react';
import { WorkflowStep, TaskCompletionState } from '../../types';
import { storage } from '../../utils/helpers';
import { WORKFLOW_STEPS, STORAGE_KEYS } from '../../constants';

const WorkflowDiagramSimple: React.FC = () => {
  // State for tracking task completion
  const [completedTasks, setCompletedTasks] = useState<TaskCompletionState>({});
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Load task completion from localStorage on component mount
  useEffect(() => {
    const savedTasks = storage.get(STORAGE_KEYS.TASK_COMPLETION) as TaskCompletionState;
    if (savedTasks) {
      setCompletedTasks(savedTasks);
    }
  }, []);

  // Save task completion to localStorage when state changes
  useEffect(() => {
    storage.set(STORAGE_KEYS.TASK_COMPLETION, completedTasks);
  }, [completedTasks]);

  // Toggle task completion status
  const toggleTask = useCallback((stepId: number, task: string) => {
    const taskKey = `task-${stepId}-${task.replace(/\\s+/g, '-').toLowerCase()}`;
    setCompletedTasks(prev => ({
      ...prev,
      [taskKey]: !prev[taskKey]
    }));
  }, []);

  // Calculate overall progress
  const calculateProgress = useCallback(() => {
    let completed = 0;
    let total = 0;
    
    WORKFLOW_STEPS.forEach(step => {
      const tasks = step.tasks || [];
      total += tasks.length;
      
      tasks.forEach(task => {
        const taskKey = `task-${step.id}-${task.replace(/\\s+/g, '-').toLowerCase()}`;
        if (completedTasks[taskKey]) {
          completed++;
        }
      });
    });
    
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [completedTasks]);

  // Get completion percentage for a specific step
  const getStepProgress = useCallback((stepId: number) => {
    const step = WORKFLOW_STEPS.find(s => s.id === stepId);
    if (!step) return 0;
    
    const tasks = step.tasks || [];
    if (tasks.length === 0) return 0;
    
    let completed = 0;
    tasks.forEach(task => {
      const taskKey = `task-${stepId}-${task.replace(/\\s+/g, '-').toLowerCase()}`;
      if (completedTasks[taskKey]) {
        completed++;
      }
    });
    
    return Math.round((completed / tasks.length) * 100);
  }, [completedTasks]);

  return (
    <section className="py-12 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Your Onboarding Journey</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Track your progress through the key milestones of your onboarding experience
          </p>
          
          {/* Progress indicator */}
          <div className="mt-8 inline-flex items-center gap-4 bg-gray-900 border border-gray-700 rounded-full px-6 py-3">
            <div className="text-sm font-medium text-white">
              Overall Progress: {calculateProgress().percentage}%
            </div>
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-700 ease-out" 
                style={{width: `${calculateProgress().percentage}%`}}
              ></div>
            </div>
          </div>
        </header>
        
        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKFLOW_STEPS.map(step => {
            const stepProgress = getStepProgress(step.id);
            
            return (
              <div key={step.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${step.badgeColor || 'bg-blue-600'}`}>
                      <span className="text-white font-bold">{step.id}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{step.title}</h3>
                      <p className="text-sm text-gray-400">{step.timeline}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-4">{step.description}</p>
                  
                  {/* Task progress */}
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>Tasks</span>
                    <span>{stepProgress}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1">
                    <div 
                      className="bg-blue-500 h-1 rounded-full transition-all duration-500" 
                      style={{width: `${stepProgress}%`}}
                    ></div>
                  </div>
                  
                  {/* Task list */}
                  <div className="mt-4 space-y-2">
                    {step.tasks.map((task, index) => {
                      const taskKey = `task-${step.id}-${task.replace(/\\s+/g, '-').toLowerCase()}`;
                      const isCompleted = completedTasks[taskKey] || false;
                      
                      return (
                        <label key={index} className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleTask(step.id, task)}
                            className="mt-1 w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded"
                          />
                          <span className={`text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-white'}`}>
                            {task}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkflowDiagramSimple;
