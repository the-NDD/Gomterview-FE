import { theme } from '@gomterview/_theme';
import { Typography, LeadingDot } from 'gomterview-design-system';
import { ServiceTourStep } from '@common/index';

type RecordStatusType = {
  isRecording: boolean;
};

const RecordStatus: React.FC<RecordStatusType> = ({ isRecording }) => {
  return (
    <ServiceTourStep stepIndex={2}>
      <LeadingDot
        color={
          isRecording
            ? `${theme.colors.status.record}`
            : `${theme.colors.status.active}`
        }
      >
        <Typography
          noWrap
          paragraph
          variant={'body1'}
          color={theme.colors.text.white}
        >
          {isRecording ? '녹화중' : '녹화준비'}
        </Typography>
      </LeadingDot>
    </ServiceTourStep>
  );
};
export default RecordStatus;
