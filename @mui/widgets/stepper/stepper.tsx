import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { Item, StepperProps } from './types';

const steps = [
  'Step 1', 'Step 2', 'Step 3', 'Step 4',
  'Step 5', 'Step 6', 'Step 7', 'Step 8', 'Step 9'
];

// ---------- Sample data (replace with your real data) ----------
const stepContents: Item[][] = [
  [
    {
      title: 'API Design',
      description:
        'JWT refresh flow redesigned. Time drift tolerance added. Metrics updated.',
      tags: ['Backend', 'Auth'],
      subtasks: [
        {
          title: 'Refresh Race Condition',
          description: 'Ensure single refresh guarantee across multiple requests.',
          tags: ['EdgeCase']
        },
        {
          title: 'Time Drift Handling',
          description: 'Grace period of ±90 seconds added for server drift.',
          tags: ['Reliability']
        }
      ]
    },
    {
      title: 'UI Accessibility Improvements',
      description: 'Contrast and focus rings updated to meet WCAG AA standards.',
      tags: ['Frontend', 'A11y'],
      subtasks: [
        { title: 'Focus Ring Pass', description: 'Consistent visible focus across components.' }
      ]
    }
  ],
  [
    {
      title: 'Data Model Design',
      description:
        'Outbox + CDC approach initiated. Materialized views planned for summary reports.',
      tags: ['Data']
    }
  ],
  [], [], [], [], [], [], []
];

// ---------- Card-style content panel for non-Step-1 ----------
function StepPanel({ items }: { items: Item[] }) {
  if (!items || items.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          No content available for this step.
        </Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={1.5}>
      {items.map((it, idx) => (
        <Paper key={idx} variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {idx + 1}. {it.title}
            </Typography>

            {it.tags && it.tags.length > 0 && (
              <Stack direction="row" gap={0.5} flexWrap="wrap">
                {it.tags.map((t) => (
                  <Chip key={t} size="small" label={t} />
                ))}
              </Stack>
            )}
          </Stack>

          {it.description && (
            <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
              {it.description}
            </Typography>
          )}

          {it.subtasks && it.subtasks.length > 0 && (
            <Box sx={{ mt: 1.25 }}>
              <Divider sx={{ mb: 1.25 }} />
              <Stack spacing={1}>
                {it.subtasks.map((s, i) => (
                  <Box key={i} sx={{ p: 1.25, borderRadius: 1.5, bgcolor: 'action.hover' }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1}>
                      <Typography sx={{ fontWeight: 600 }}>
                        {i + 1}. {s.title}
                      </Typography>

                      {s.tags && s.tags.length > 0 && (
                        <Stack direction="row" gap={0.5} flexWrap="wrap">
                          {s.tags.map((t) => (
                            <Chip key={t} size="small" label={t} />
                          ))}
                        </Stack>
                      )}
                    </Stack>

                    {s.description && (
                      <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
                        {s.description}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Paper>
      ))}
    </Stack>
  );
}

// ---------- Read-only Accordion content for Step 1 ----------
function StepOneAccordion({
  items,
  allExpanded
}: {
  items: Item[];
  allExpanded: boolean;
}) {
  const [expandedMap, setExpandedMap] = React.useState<Record<number, boolean>>({});

  React.useEffect(() => {
    const next: Record<number, boolean> = {};
    (items || []).forEach((_, idx) => (next[idx] = allExpanded));
    setExpandedMap(next);
  }, [allExpanded, items]);

  const toggleOne = (idx: number) =>
    setExpandedMap((m) => ({ ...m, [idx]: !m[idx] }));

  if (!items || items.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          No content available for Step 1.
        </Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={1}>
      {items.map((it, idx) => {
        const expanded = expandedMap[idx] ?? allExpanded;
        return (
          <Accordion key={idx} disableGutters expanded={expanded} onChange={() => toggleOne(idx)} sx={{ borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ '& .MuiAccordionSummary-content': { my: 0 }, '& .MuiAccordionSummary-content.Mui-expanded': { my: 0 } }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" gap={1} sx={{ width: '100%' }}>
                <Typography sx={{ fontWeight: 600 }}>
                  {idx + 1}. {it.title}
                </Typography>

                {it.tags && it.tags.length > 0 && (
                  <Stack direction="row" gap={0.5} flexWrap="wrap">
                    {it.tags.map((t) => (
                      <Chip key={t} size="small" label={t} />
                    ))}
                  </Stack>
                )}
              </Stack>
            </AccordionSummary>

            <AccordionDetails>
              {it.description && (
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {it.description}
                </Typography>
              )}

              {it.subtasks && it.subtasks.length > 0 && (
                <>
                  <Divider sx={{ my: 1.25 }} />
                  <Stack spacing={1}>
                    {it.subtasks.map((s, subIdx) => (
                      <Box key={subIdx} sx={{ p: 1.25, borderRadius: 1.5, bgcolor: 'action.hover' }}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" gap={1} sx={{ mb: 0.5 }}>
                          <Typography sx={{ fontWeight: 600 }}>
                            {subIdx + 1}. {s.title}
                          </Typography>

                          {s.tags && s.tags.length > 0 && (
                            <Stack direction="row" gap={0.5} flexWrap="wrap">
                              {s.tags.map((t) => (
                                <Chip key={t} size="small" label={t} />
                              ))}
                            </Stack>
                          )}
                        </Stack>

                        {s.description && (
                          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                            {s.description}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Stack>
  );
}

// ---------- Main Stepper Component ----------
export default function HorizontalLinearStepper({ }: StepperProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [step1AllExpanded, setStep1AllExpanded] = React.useState<boolean>(true);

  // Version dropdown (UI-only)
  const versions = ['v1.0', 'v1.2', 'v1.5', 'v1.8', 'v2.0'];
  const [selectedVersion, setSelectedVersion] = React.useState<string>(versions[versions.length - 1]);

  const isStepOptional = (step: number) => step === 1;
  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prev) => prev + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prev) => prev + 1);
    setSkipped((prevSkipped) => {
      const next = new Set(prevSkipped.values());
      next.add(activeStep);
      return next;
    });
  };

  const handleReset = () => setActiveStep(0);

  const expandToggleIcon = step1AllExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />;

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};

          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed — you&apos;re finished.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box role="region" aria-label={`Content for ${steps[activeStep]}`} sx={{ mt: 2, p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
            {/* Header: title (left) • version dropdown + icon-only expand/collapse (right) */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }} gap={1}>
              <Typography variant="h6">{steps[activeStep]}</Typography>

              <Stack direction="row" alignItems="center" gap={1}>
                {/* Version dropdown (UI-only, no services) */}
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select value={selectedVersion} onChange={(e) => setSelectedVersion(e.target.value as string)} displayEmpty inputProps={{ 'aria-label': 'Version selector' }}>
                    {versions.map((v) => (
                      <MenuItem key={v} value={v}>{v}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Icon-only expand/collapse for Step 1 */}
                {activeStep === 0 && (
                  <Tooltip title={step1AllExpanded ? 'Collapse all' : 'Expand all'}>
                    <IconButton size="small" onClick={() => setStep1AllExpanded((p) => !p)} aria-label={step1AllExpanded ? 'Collapse all' : 'Expand all'}>
                      {expandToggleIcon}
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {/* Step 1 uses read-only accordion; others use card panel */}
            {activeStep === 0 ? (
              <StepOneAccordion items={stepContents[0] || []} allExpanded={step1AllExpanded} />
            ) : (
              <StepPanel items={stepContents[activeStep] || []} />
            )}
          </Box>

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
