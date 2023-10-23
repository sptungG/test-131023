**Yêu cầu**

_Ứng viên thực hiện làm bài test dưới đây (có thể dùng Material UI, hạn chế sử dụng thư viện khác hoặc giải pháp từ bên thứ 3 nếu có thể)._

Viết 1 ứng dụng nhỏ bằng **React**

Viết một ứng dụng bằng **React** sử dụng **Typescript** gồm 2 tab như sau:

- Active tab tương ứng khi người dùng chọn

**Tab thông tin**:

- Các trường: Tên chiến dịch, Mô tả (bắt buộc nhập trường Tên chiến dịch)

**Tab Chiến dịch con**:

- Bao gồm một danh sách các chiến dịch con

- Mặc định active Chiến dịch con 1 được tạo sẵn

- Nút Add (+):

  - Để thêm mới một Chiến dịch con vào danh sách
  
  - Chiến dịch con mới mặc định chứa 1 quảng cáo
  
  - Một Chiến dịch con bao gồm:
  
  - Thông tin chiến dịch con: Tên chiến dịch con, Trạng thái hoạt động (Bắt buộc nhập trường Tên chiến dịch con)
  
  - Danh sách các quảng cáo của chiến dịch con

  - Một quảng cáo bao gồm:

    - Thông tin quảng cáo: Tên quảng cáo, Số lượng (Bắt buộc nhập cả 2 trường, trường Số lượng phải lớn hơn 0)

    - Nút Thêm (+):

      Để thêm mới một quảng cáo vào danh sách
      
      Danh sách quảng cáo của một chiến dịch con phải lớn hơn 0
      
      Số lượng của chiến dịch con (số hiển thị ở dưới tên chiến dịch con trong demo) bằng tổng số lượng của tất cả các quảng cáo

**Validation** có 2 trường hợp:

- Trường hợp 1: Khi chưa click nút submit

  Không hiển thị cảnh báo lỗi

- Trường hợp 2: Đã click vào nút submit

  Hiện cảnh báo lỗi cho tất cả các trường bắt buộc ở cả 2 Tab.

  Hiện cảnh báo lỗi cho tất cả các chiến dịch con (Chuyển tên chiến dịch con bị lỗi thành màu đỏ).

**submit**

- Toàn bộ thông tin trong hai tab hợp lệ (không có cảnh báo): Thành công

- Ngược lại: Vui lòng điền đúng và đầy đủ thông tin và thực hiện validation với các trường bắt buộc nhập

Dữ liệu chiến dịch

```ts
campaign: {
  information: { name: string; describe?: string };
  subCampaigns: [{ name: string; status: boolean; ads: [{ name: string; quantity: number }] }]
}
```

Ví dụ:

Tham khảo ứng dụng được tạo sẵn ở menu: Demo
