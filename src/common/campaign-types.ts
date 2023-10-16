import { InferType, array, boolean, number, object, string } from "yup";

const subCampaignSchema = object({
  name: string().required("Trường này là bắt buộc"),
  status: boolean().default(false),
  ads: array(
    object({
      name: string().required("Trường này là bắt buộc"),
      quantity: number().min(1, "Số lượng phải lớn hơn 0"),
    })
  ).min(1, "Danh sách quảng cáo của một chiến dịch con phải lớn hơn 0"),
});
export type TSubCampaign = InferType<typeof subCampaignSchema>;

export const campaignSchema = object({
  name: string().required("Trường này là bắt buộc"),
  describe: string().required("Trường này là bắt buộc"),
  subCampaigns: array(subCampaignSchema),
});

export type TCampaign = InferType<typeof campaignSchema>;
