import * as yup from 'yup';

const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required('Comment is required')
    .max(150, 'Commnet should be less than 150 characters'),
  rating: yup.number().required('Select a rating'),
});

const movieValidation = yup.object().shape({
  name: yup
    .string()
    .required('Please enter a movie name')
    .max(50, 'Movie name must be at least 50 characters'),
  time: yup.number().required('Please enter a movie time'),
  language: yup.string().required('Please enter a movie language'),
  year: yup.number().required('Please enter a movie year'),
  category: yup.string().required('Please enter a movie category'),
  desc: yup
    .string()
    .required('Please enter a movie description')
    .max(500, 'Movie description should be less than 300 characters'),
});

export { ReviewValidation, movieValidation };
