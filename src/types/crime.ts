export interface CrimeReport {
    id: string; // Backend dùng UUID
    reporterId?: string;
    title: string;
    description: string;
    type: string;
    lat: number; // Decimal từ BE trả về number
    lng: number;
    address: string;

    // Các trường địa chỉ chi tiết
    province?: string;
    district?: string;
    ward?: string;
    street?: string;

    // Metadata
    status: number;
    severity: number;
    severityLevel: 'low' | 'medium' | 'high'; // Field computed từ BE

    // Dù DTO bạn gửi thiếu attachments, nhưng Entity có và Map cần ảnh
    // nên mình vẫn giữ field này để UI không bị lỗi.
    attachments?: string[];

    createdAt: string; // Date string
    updatedAt: string;
}

