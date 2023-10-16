import { yupResolver } from "@hookform/resolvers/yup";
import { AddCircleRounded, SendRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Stack,
  Tab,
  Tabs,
  TextField,
  styled,
} from "@mui/material";
import { useId, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import SubCampaignsFormList from "./components/SubCampaignsFormList";
import SubCampaignsTab from "./components/SubCampaignsTab";
import { campaignSchema } from "./common/campaign-types";

const tabs = ["Thông tin", "Chiến dịch con"];

function App() {
  const uid = useId();
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);
  const [selectedSubCampaignIndex, setSelectedSubCampaignIndex] = useState<number>(0);
  // const theme = useTheme();
  const [formData, setFormData] = useState<unknown>();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(campaignSchema),
    defaultValues: {
      subCampaigns: [{ name: "Chiến dịch con 1", status: true, ads: [{ name: "", quantity: 0 }] }],
    },
  });

  const subCampaignsWatch = watch("subCampaigns", []);

  const subCampaignsFields = useFieldArray({
    control,
    name: "subCampaigns",
    rules: { required: true },
  });

  const onSubmitForm = handleSubmit((formData) => {
    const { describe, name, subCampaigns } = formData;
    setFormData({ campaign: { information: { describe, name }, subCampaigns } });
  });

  const onResetForm = () => {
    reset();
    setSelectedTab(tabs[0]);
  };

  const handleCloseDialog = () => {
    setFormData(undefined);
    setSelectedTab(tabs[0]);
    reset();
  };

  return (
    <PageWrapper maxWidth="sm">
      <Tabs
        value={selectedTab}
        onChange={(e, v) => {
          setSelectedTab(v);
        }}
        className="tabs-wrapper"
      >
        <Tab value={tabs[0]} label={tabs[0].toUpperCase()} />
        <Tab
          value={tabs[1]}
          label={
            <Stack direction="row" alignItems="center">
              {tabs[1].toUpperCase()}
              <Chip
                variant="soft"
                size="small"
                color="primary"
                label={subCampaignsFields.fields.length}
                sx={{ ml: 1 }}
              />
            </Stack>
          }
        />
      </Tabs>

      <Box component="form" noValidate id={uid + "Form"} onSubmit={onSubmitForm}>
        {selectedTab === tabs[0] && (
          <>
            <TextField
              label="Tên chiến dịch"
              required
              sx={{ mt: 3, mb: 0.3 }}
              error={!!errors?.name?.message}
              helperText={errors?.name?.message || " "}
              {...register("name")}
            />
            <TextField
              label="Mô tả"
              multiline
              minRows={2}
              sx={{ mb: 0.3 }}
              error={!!errors?.describe?.message}
              helperText={errors?.describe?.message || " "}
              {...register("describe")}
            />
          </>
        )}

        {selectedTab === tabs[1] && (
          <>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={2}
              mt={0}
              mb={0.1}
            >
              <FormLabel required>Danh sách</FormLabel>
              <Button
                startIcon={<AddCircleRounded />}
                onClick={() => {
                  subCampaignsFields.append({
                    name: `Chiến dịch con ${subCampaignsFields.fields.length + 1}`,
                    status: true,
                    ads: [{ name: "", quantity: 0 }],
                  });
                }}
              >
                Thêm
              </Button>
            </Stack>
            <Tabs
              value={selectedSubCampaignIndex}
              onChange={(e, v) => setSelectedSubCampaignIndex(v)}
              variant="scrollable"
              sx={{
                mb: 3,
                "& .MuiTabScrollButton-root": {
                  display: "none",
                  "&.Mui-disabled": { width: 0 },
                },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
              }}
            >
              {subCampaignsWatch?.map((field, index) => (
                <SubCampaignsTab
                  key={uid + "subCampaignTabs" + index}
                  wrapped
                  value={index}
                  index={index}
                  {...field}
                />
              ))}
            </Tabs>

            {subCampaignsFields.fields.map((field, index) => {
              const isSelected = selectedSubCampaignIndex === index;
              return (
                <Stack
                  display={isSelected ? "flex" : "none"}
                  key={uid + "subCampaigns" + field.id + index}
                >
                  <TextField
                    label="Tên chiến dịch con"
                    required
                    disabled={!isSelected}
                    error={!!errors?.subCampaigns?.[index]?.name?.message}
                    helperText={errors?.subCampaigns?.[index]?.name?.message}
                    {...register(`subCampaigns.${index}.name` as const)}
                  />
                  <Controller
                    name={`subCampaigns.${index}.status` as const}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="Đang hoạt động"
                        sx={{ mb: 1 }}
                        disabled={!isSelected}
                        checked={field.value}
                        control={<Checkbox onChange={(e, checked) => field.onChange(checked)} />}
                      />
                    )}
                  />

                  <FormLabel required sx={{ mb: 1.5 }}>
                    Danh sách quảng cáo (Ads)
                  </FormLabel>
                  <SubCampaignsFormList index={index} control={control} />
                  <FormHelperText
                    sx={{ mb: 0.3 }}
                    error={!!errors.subCampaigns?.[index]?.ads?.message}
                  >
                    {errors.subCampaigns?.[index]?.ads?.message || " "}
                  </FormHelperText>
                </Stack>
              );
            })}
          </>
        )}
      </Box>

      <div className="actions-bottom">
        <Button variant="soft" color="primary" sx={{ mr: 2 }} onClick={onResetForm}>
          Hủy
        </Button>
        <Button
          variant="contained"
          sx={{ px: 3 }}
          startIcon={<SendRounded />}
          type="submit"
          form={uid + "Form"}
        >
          Xác nhận
        </Button>
      </div>

      <Dialog fullWidth maxWidth="sm" open={!!formData} onClose={handleCloseDialog}>
        <DialogTitle sx={{ height: "64px" }}>Thành công</DialogTitle>
        <DialogContent sx={{ whiteSpace: "pre" }}>
          {JSON.stringify(formData, null, 4)}
        </DialogContent>
        <DialogActions sx={{ height: "64px", px: 2, py: 2 }}>
          <Button autoFocus onClick={handleCloseDialog}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
}

const PageWrapper = styled(Container)`
  margin-top: 24px;
  padding: 12px 24px 18px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  position: relative;
  & > .tabs-wrapper {
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
  }
  & > form {
    margin: 0 auto 18px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
    display: flex;
    flex-direction: column;
  }
  & > .actions-bottom {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

export default App;
