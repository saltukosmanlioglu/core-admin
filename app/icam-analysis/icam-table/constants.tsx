import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{
    text: 'ICAM Table',
  }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'ICAM Table'
}
export type Data = {
  category: string;
  items: {
    text: string;   // includes the code (e.g., "SM6: ...")
    rating: number; // used for the Gauge
  }[];
};

export const data: Data[] = [
  {
    category: "Absent / Failed Defences",
    items: [
      {
        text: "SM6: Post-blast inspection protocols failed to identify critical warning signs — Dr. Anthony Richards acknowledged that 'subtle indicators such as minor cracks and slight water seepage might have been overlooked due to the quick visual scan rather than a detailed examination.' The inspection by Robert Wilson's blast crew did not detect the imminent highwall failure despite evidence of water seepage and minor cracks that were later identified as precursors to the rockfall.",
        rating: 95,
      },
      {
        text: "SM1: Risk management arrangements inadequately addressed the combined impact of recent heavy rainfall and blast-induced vibrations — the geotechnical analysis revealed that 150mm of rainfall over the preceding week had weakened the rock mass, yet this critical environmental factor was not properly integrated into the post-blast risk assessment conducted by the blast crew.",
        rating: 90,
      },
      {
        text: "SM6: Continuous monitoring systems were absent — Dr. Anthony Richards noted that 'continuous monitoring systems, such as ground-penetrating radar and slope stability radar' were not in place to detect real-time changes in highwall stability, representing a fundamental gap in monitoring defenses.",
        rating: 85,
      },
    ],
  },
  {
    category: "Individual / Team Actions",
    items: [
      {
        text: "IN1: John Miller's situation assessment was compromised by incomplete information — he observed 'some loose material on the highwall but did not consider it significant enough to report urgently' because he 'assumed the post-blast inspection had thoroughly assessed the area,' demonstrating inadequate independent risk evaluation despite visible warning signs.",
        rating: 90,
      },
      {
        text: "CF1: Robert Wilson's risk communication was incomplete — he admitted that 'we did not explicitly discuss the potential risks associated with minor signs of instability, such as small cracks or water seepage, that we observed but did not deem immediately threatening,' failing to communicate critical hazard information to excavator operator John Miller.",
        rating: 95,
      },
      {
        text: "IN2: The blast crew's perception and understanding of risk indicators was inadequate — despite observing minor cracks and water seepage during the post-blast inspection, Robert Wilson and his team failed to recognize these as significant precursors to highwall failure, particularly given the recent heavy rainfall conditions.",
        rating: 85,
      },
    ],
  },
  {
    category: "Task / Environmental Conditions",
    items: [
      {
        text: "EC1: Recent heavy rainfall created critical environmental conditions — approximately 150mm of rainfall over the week preceding the incident significantly increased moisture content in the rock mass and created water infiltration along pre-existing discontinuities, fundamentally altering the stability conditions of the 40-meter highwall in Section A.",
        rating: 100,
      },
      {
        text: "EC3: Blast-induced vibrations from the adjacent Section B blast propagated through the already weakened rock mass — the blast conducted approximately 30 meters from the highwall generated ground vibrations that 'likely disrupted the already weakened highwall, triggering the rockfall' according to Dr. Anthony Richards' geotechnical analysis.",
        rating: 95,
      },
      {
        text: "TD4: The task design failed to account for the sequential nature of environmental and operational stressors — the combination of recent rainfall effects and immediate post-blast excavation created a high-risk scenario where weakened geological conditions were subjected to additional stress from nearby blasting operations.",
        rating: 90,
      },
    ],
  },
  {
    category: "Organisational Factors",
    items: [
      {
        text: "TC3: Training quality was insufficient for recognizing subtle geotechnical warning signs — the post-blast inspection team failed to identify critical indicators of instability, suggesting inadequate training in recognizing the combined effects of weather conditions and blast impacts on highwall stability.",
        rating: 85,
      },
      {
        text: "SM1: Organizational risk management arrangements failed to integrate geotechnical and meteorological factors — despite Dr. Anthony Richards identifying that 'the influence of recent heavy rainfall on highwall stability was not adequately considered' in pre-blast assessments, there were no systematic protocols for adjusting inspection rigor based on recent weather conditions.",
        rating: 90,
      },
      {
        text: "SM8: Safety trend analysis and review practices were inadequate — the organization lacked systematic analysis of how environmental factors like significant rainfall events should trigger enhanced inspection protocols, as evidenced by Dr. Anthony Richards' recommendation for 'more rigorous inspection protocols that include detailed geotechnical assessments after significant blasts, especially considering recent weather conditions'.",
        rating: 85,
      },
    ],
  },
];
