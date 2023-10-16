import { CheckCircleRounded } from "@mui/icons-material";
import { Avatar, Box, Chip, Stack, Tab, TabProps, Typography, alpha, styled } from "@mui/material";
import { TSubCampaign } from "../common/campaign-types";

type TSubCampaignsTabProps = Omit<TabProps, "name"> & {
  index?: number;
} & TSubCampaign;

const SubCampaignsTab = ({
  value,
  index = 0,
  name,
  status,
  ads,
  ...props
}: TSubCampaignsTabProps) => {
  const totalAds = ads?.reduce((prev, curr) => prev + +curr.quantity, 0);

  return (
    <StyledTab
      value={value}
      label={
        <Box className="content-wrapper">
          <Avatar className="index-wrapper">{index + 1}</Avatar>
          <Stack alignItems="flex-start" spacing={1}>
            <Stack direction="row" alignItems="center" maxWidth="200px" spacing={1}>
              <Typography
                variant="caption"
                fontSize={16}
                fontWeight={600}
                whiteSpace="nowrap"
                lineHeight={1.4}
                noWrap
              >
                {name || "Chưa có tên"}
              </Typography>
              <CheckCircleRounded
                fontSize="small"
                color={status ? "success" : "action"}
                style={{ opacity: status ? 0.9 : 0.5 }}
              />
            </Stack>
            <Stack alignItems="center" direction="row" spacing={1}>
              <Typography variant="caption">Ads:</Typography>
              <Chip variant="soft" size="small" color="default" label={totalAds} />
            </Stack>
          </Stack>
        </Box>
      }
      {...props}
    />
  );
};

const StyledTab = styled(Tab)`
  border: 1px solid ${({ theme }) => theme.palette.grey[100]};
  margin-right: 16px;
  border-radius: 8px;
  padding: 12px 12px 12px 22px;
  opacity: 0.65;

  & .content-wrapper {
    position: relative;
    z-index: 1;
    & > .index-wrapper {
      position: absolute;
      z-index: -1;
      opacity: 0.15;
      top: 0;
      left: 0;
      transform: translate(-38px, -18px);
      background-color: ${({ theme }) => theme.palette.grey[200]};
      color: ${({ theme }) => theme.palette.grey[400]};
      width: 56px;
      height: 56px;
      font-size: 26px;
    }
  }

  &.Mui-selected {
    opacity: 1;
    border-color: ${({ theme }) => theme.palette.primary.main};
    & .content-wrapper > .index-wrapper {
      opacity: 0.25;
      color: ${({ theme }) => theme.palette.primary.main};
      background-color: ${({ theme }) => alpha(theme.palette.primary.main, 0.1)};
    }
  }
`;

export default SubCampaignsTab;
