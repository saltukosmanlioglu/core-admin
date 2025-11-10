import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{ text: 'Contributing Factors', }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'Contributing Factors'
}

export type Factor = {
  factor: string;
  rating: number; // 0..100
  explanation: string;
};

export const data: Factor[] = [
  {
    factor:
      "Significant rainfall (150mm over past week) weakened rock mass strength through water infiltration along pre-existing discontinuities",
    rating: 95,
    explanation:
      "Dr. Anthony Richards' geotechnical report explicitly identifies water infiltration as creating a 'lubricated plane of weakness' and reducing overall rock mass strength. This is supported by post-incident evidence of water seepage along the failure plane.",
  },
  {
    factor:
      "Blast-induced vibrations from Section B (30 meters away) triggered the rockfall in the already weakened highwall",
    rating: 90,
    explanation:
      "The geotechnical analysis confirms that blast vibrations 'likely disrupted the already weakened highwall, triggering the rockfall.' The timing correlation between the 3pm blast and 3:15pm rockfall supports this causal relationship.",
  },
  {
    factor:
      "Insufficient post-blast inspection protocols failed to detect subtle signs of highwall instability including minor cracks and water seepage",
    rating: 85,
    explanation:
      "Robert Wilson acknowledged observing 'small cracks or water seepage' but not deeming them 'immediately threatening.' Dr. Richards noted these indicators 'might have been overlooked due to quick visual scan rather than detailed examination.'",
  },
  {
    factor:
      "Inadequate communication of potential risks to excavation crew, with John Miller not informed about minor cracks and water seepage observed during inspection",
    rating: 80,
    explanation:
      "Robert Wilson admitted they 'did not explicitly discuss the potential risks associated with minor signs of instability' and John Miller confirmed he 'was not given detailed information about specific findings of the post-blast inspection.'",
  },
  {
    factor:
      "John Miller failed to report observed loose material on highwall before commencing excavation work",
    rating: 70,
    explanation:
      "John Miller's statement confirms he 'observed some loose material on the highwall but did not consider it significant enough to report urgently.' This represents a missed opportunity to reassess conditions before proceeding.",
  },
  {
    factor:
      "Inadequate water management systems failed to control surface water infiltration into highwall after significant rainfall",
    rating: 75,
    explanation:
      "Dr. Richards identified that 'existing drainage systems were not adequate to mitigate the impact of significant rainfall on highwall stability,' though specific details of drainage system failures are limited in the evidence.",
  },
  {
    factor:
      "Incomplete Take 5 risk assessment by John Miller failed to identify rockfall hazard despite observable loose material",
    rating: 65,
    explanation:
      "John Miller's Take 5 assessment marked 'No' for rockfall hazard and identified 'no hazards except vehicle interaction,' yet he later admitted observing loose material. This represents inadequate hazard identification.",
  },
  {
    factor:
      "Lack of continuous monitoring systems to detect real-time changes in highwall stability after weather events and blasting",
    rating: 60,
    explanation:
      "Dr. Richards recommends implementing 'continuous monitoring systems such as ground-penetrating radar and slope stability radar,' indicating their absence contributed to the inability to detect developing instability.",
  },
  {
    factor:
      "James Anderson (Open Cut Examiner) did not personally participate in post-blast inspection, relying on briefing from blast crew leader",
    rating: 55,
    explanation:
      "James Anderson confirmed he 'did not personally participate in the post-blast inspection' but was 'briefed by Robert Wilson.' This represents a potential gap in independent verification of highwall conditions by the designated safety examiner.",
  },
];