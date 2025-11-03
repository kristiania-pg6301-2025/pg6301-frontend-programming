export interface RentalLocation {
  _id: string;
  name: string;
  summary: string;
  description: string;
  images: {
    picture_url: string;
  };
  reviews: {
    _id: string;
    date: Date;
    reviewer_name: string;
    comments: string;
  }[];
}
