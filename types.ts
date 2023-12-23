import z from 'zod';

export type TloginSchema = z.infer<typeof loginSchema>;
export type TregisterSchema = z.infer<typeof registerSchema>;
export type TcreateJobSchema = z.infer<typeof createJobSchema>;
export type TeditProfileSchema = z.infer<typeof editProfileSchema>;

export type Tjobs = {
  _id: string;
  company: string;
  position: string;
  jobStatus: string;
  jobType: string;
  jobLocation: string;
  createdBy: string;
  createdAt: string;
  updatetAt: string;
  __v: number;
};

export const loginSchema = z.object({
  email: z.string().email().nonempty('Please input your email'),
  password: z.string().nonempty('Please input your password'),
});

export const registerSchema = z.object({
  name: z.string().nonempty('Please input your name'),
  lastName: z.string().nonempty('Please input your last name'),
  email: z.string().email().nonempty('Please input your email'),
  password: z
    .string()
    .min(8, 'Password minimum 8 character')
    .nonempty('Please input your password'),
  location: z.string().nonempty('Please input your location'),
});

export const createJobSchema = z.object({
  company: z.string().nonempty('Please input your company'),
  position: z.string().nonempty('Please input your position'),
  jobLocation: z.string().nonempty('Please input job location'),
  jobType: z.string().nonempty('Please select job type'),
  jobStatus: z.string().nonempty('Please select job status'),
});

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const editProfileSchema = z.object({
  avatar: z.any(),
  name: z.string(),
  email: z.string().email(),
  lastName: z.string(),
  location: z.string(),
});
