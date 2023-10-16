import { AddRounded, DeleteOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  alpha,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { TCampaign } from "../common/campaign-types";

type TSubCampaignsFormListProps = {
  index: number;
  control?: Control<TCampaign>;
  onChangeSelected?: (index: number) => void;
  renderItem?: (item?: unknown) => React.ReactNode;
};

const SubCampaignsFormList = ({ index, control }: TSubCampaignsFormListProps) => {
  const theme = useTheme();
  const subCampaignAdsFields = useFieldArray({
    control,
    name: `subCampaigns.${index}.ads` as const,
    rules: { required: true },
  });

  return (
    <Grid container spacing={2}>
      {subCampaignAdsFields.fields?.map((fieldAds, indexAds) => {
        return (
          <Grid item xs={6} key={index + fieldAds.id + "ads" + indexAds}>
            <StyledAdsItem>
              <Avatar className="index-wrapper">{indexAds + 1}</Avatar>
              <IconButton
                sx={{
                  position: "absolute",
                  right: `4px`,
                  top: `4px`,
                  opacity: 0.9,
                  borderStyle: "dashed !important",
                  zIndex: 1,
                }}
                color="error"
                size="small"
                onClick={() => {
                  subCampaignAdsFields.remove(indexAds);
                }}
              >
                <DeleteOutline fontSize="small" />
              </IconButton>

              <Stack direction="column" spacing={2} sx={{ minWidth: 0, flex: "1 1 auto" }}>
                <Controller
                  control={control}
                  name={`subCampaigns.${index}.ads.${indexAds}.name` as const}
                  render={({ field, fieldState }) => (
                    <TextField
                      label={
                        <>
                          {"Tên quảng cáo"} <b>{indexAds + 1}</b>
                        </>
                      }
                      fullWidth
                      required
                      variant="standard"
                      autoComplete="off"
                      InputLabelProps={{ shrink: true }}
                      sx={{ "& .MuiInputBase-root:before": { opacity: 0.5 } }}
                      error={!!fieldState.error?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`subCampaigns.${index}.ads.${indexAds}.quantity` as const}
                  render={({ field, fieldState }) => (
                    <TextField
                      label={"Số lượng"}
                      fullWidth
                      required
                      variant="standard"
                      autoComplete="off"
                      InputLabelProps={{ shrink: true }}
                      sx={{ "& .MuiInputBase-root:before": { opacity: 0.5 } }}
                      error={!!fieldState.error?.message}
                      type="number"
                      {...field}
                    />
                  )}
                />
              </Stack>
            </StyledAdsItem>
          </Grid>
        );
      })}
      <Grid item xs={6}>
        <Stack
          justifyContent="center"
          alignItems="center"
          height="142px"
          sx={{
            cursor: "pointer",
            border: `1px dashed ${theme.palette.grey[300]}`,
            borderRadius: 1,
            "&:hover": {
              borderColor: alpha(theme.palette.primary.main, 0.5),
              color: theme.palette.primary.main,
            },
          }}
          onClick={() => {
            subCampaignAdsFields.append(
              { name: `Quảng cáo ${subCampaignAdsFields.fields.length + 1}`, quantity: 0 },
              { shouldFocus: false }
            );
          }}
        >
          <AddRounded />
          <Typography>Thêm</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

const StyledAdsItem = styled(Box)`
  position: relative;
  z-index: 1;
  border: ${({ theme }) => `1px dashed ${theme.palette.grey[300]}`};
  border-radius: 4px;
  padding: 12px 16px 16px 22px;
  overflow: hidden;
  cursor: pointer;
  .MuiListItemSecondaryAction-root {
    right: 1;
  }
  & > .index-wrapper {
    position: absolute;
    z-index: -1;
    opacity: 0.15;
    top: 0;
    left: 0;
    transform: translate(-16px, -8px);
    background-color: ${({ theme }) => theme.palette.grey[200]};
    color: ${({ theme }) => theme.palette.grey[400]};
    width: 56px;
    height: 56px;
    font-size: 28px;
  }
  &:hover {
    border-color: ${({ theme }) => theme.palette.primary.main};
    & > .index-wrapper {
      opacity: 0.25;
      color: ${({ theme }) => theme.palette.primary.main};
      background-color: ${({ theme }) => alpha(theme.palette.primary.main, 0.1)};
    }
  }
`;

export default SubCampaignsFormList;
