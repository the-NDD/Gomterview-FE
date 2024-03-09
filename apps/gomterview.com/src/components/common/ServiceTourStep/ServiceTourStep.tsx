interface TourStepWrapperProps {
  children: React.ReactElement;
  stepIndex: number;
}

const ServiceTourStep: React.FC<TourStepWrapperProps> = ({
  children,
  stepIndex,
}) => {
  const virtualDivId = `virtual-step-target-${stepIndex}`;

  return <div id={virtualDivId}>{children}</div>;
};

export default ServiceTourStep;
