// Illustrative data used only by the marketing-site product previews.
export const learnerDemo = {
  name: 'Ahmed',
  progress: 72,
  journey: ['Fractions', 'Equivalent fractions', 'Compare fractions'],
  recommendedLesson: 'Compare fractions with bar models',
};

export const teacherWorkflowDemo = {
  className: 'Grade 4A',
  content: {
    grade: 'Grade 4',
    outcome: 'Add and subtract multi-digit numbers',
    skill: 'Addition with regrouping',
    activity: 'Place-value models for regrouping',
  },
  assignments: [
    { learner: 'Learner 01', status: 'Not Started', attempts: 0, lastActive: 'Yesterday', presence: 'Offline', timeUsed: '0 min', illustrative: true },
    { learner: 'Learner 02', status: 'In Progress', attempts: 2, lastActive: '10:42', presence: 'Online', timeUsed: '18 min', illustrative: true },
    { learner: 'Learner 03', status: 'Completed', attempts: 3, lastActive: '09:15', presence: 'Offline', timeUsed: '24 min', illustrative: true },
  ],
  attempts: [
    { attempt: 1, difficulty: 'Foundational', result: 'Partial evidence' },
    { attempt: 2, difficulty: 'Core', result: 'Regrouping gap repeated; prerequisite recommended' },
  ],
  attention: {
    learner: 'Learner 02',
    reason: 'Repeated regrouping errors across two difficulty levels',
    evidence: 'Two attempts plus place-value model responses',
    affectedSkill: 'Grade 2 place-value prerequisite',
    suggestedAction: 'Assign supported place-value practice, then review Grade 4 addition',
  },
};

export const schoolDemo = {
  metrics: [
    { label: 'Platform use', value: '82%', percent: 82 },
    { label: 'Class progress', value: '68%', percent: 68 },
    { label: 'Learner progress', value: '74%', percent: 74 },
    { label: 'Assignment completion', value: '71%', percent: 71 },
  ],
  outcomeProgress: [
    { label: 'Number and operations', value: 76 },
    { label: 'Measurement', value: 64 },
  ],
  attentionCount: 4,
};

export const districtDemo = {
  filters: ['Emirate', 'District', 'School', 'Grade', 'Teacher', 'Learner'],
  schools: [
    { name: 'School 01', progress: 74 },
    { name: 'School 02', progress: 68 },
    { name: 'School 03', progress: 81 },
  ],
  periods: ['Previous period', 'Current period'],
  curriculumProgress: 72,
  exports: ['Excel', 'CSV', 'PDF'],
};

export const studentChoicesDemo = [
  { id: 'assigned-work', icon: 'clipboard' },
  { id: 'adaptive-path', icon: 'route' },
  { id: 'explore-topic', icon: 'grid' },
] as const;

export const prerequisiteDemo = {
  steps: [
    'Grade 3 Addition',
    'Regrouping Gap',
    'Grade 2 Place Value Prerequisite',
    'Supported Practice',
    'Return to Grade 3 Addition',
    'Mastery Check',
  ],
};
