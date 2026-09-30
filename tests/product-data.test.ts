import { describe, expect, it } from 'vitest';
import {
  districtDemo,
  learnerDemo,
  prerequisiteDemo,
  schoolDemo,
  studentChoicesDemo,
  teacherWorkflowDemo,
} from '../components/product-ui/demo-data';

describe('product visualization demo data', () => {
  it('marks every teacher learner record as illustrative', () => {
    expect(teacherWorkflowDemo.assignments).toHaveLength(3);
    expect(teacherWorkflowDemo.assignments.every((learner) => learner.illustrative)).toBe(true);
  });

  it('uses only the approved assignment states', () => {
    expect(teacherWorkflowDemo.assignments.map((item) => item.status)).toEqual([
      'Not Started',
      'In Progress',
      'Completed',
    ]);
  });

  it('keeps attention evidence and action together', () => {
    expect(teacherWorkflowDemo.attention).toEqual(
      expect.objectContaining({
        reason: expect.any(String),
        evidence: expect.any(String),
        affectedSkill: expect.any(String),
        suggestedAction: expect.any(String),
      }),
    );
  });

  it('separates school and district preview datasets', () => {
    expect(schoolDemo.metrics).toHaveLength(4);
    expect(districtDemo.filters).toEqual(['Emirate', 'District', 'School', 'Grade', 'Teacher', 'Learner']);
    expect(districtDemo.exports).toEqual(['Excel', 'CSV', 'PDF']);
  });

  it('uses generic illustrative identifiers instead of real-person names', () => {
    const data = JSON.stringify({ schoolDemo, districtDemo });
    expect(data).not.toMatch(/Aisha|Omar|Layla|Hassan/i);
    expect(data).not.toMatch(/@/);
  });

  it('keeps every displayed percentage in range', () => {
    const percentages = [
      learnerDemo.progress,
      ...schoolDemo.metrics.filter((metric) => metric.percent).map((metric) => metric.percent as number),
      ...districtDemo.schools.map((school) => school.progress),
    ];

    percentages.forEach((value) => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    });
  });

  it('keeps the student entry surface to the three approved choices', () => {
    expect(studentChoicesDemo).toHaveLength(3);
    expect(studentChoicesDemo.map((choice) => choice.id)).toEqual([
      'assigned-work',
      'adaptive-path',
      'explore-topic',
    ]);
  });

  it('keeps the prerequisite example in the approved order', () => {
    expect(prerequisiteDemo.steps).toEqual([
      'Grade 3 Addition',
      'Regrouping Gap',
      'Grade 2 Place Value Prerequisite',
      'Supported Practice',
      'Return to Grade 3 Addition',
      'Mastery Check',
    ]);
  });
});
