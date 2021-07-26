module.exports = {
  env: {
    DB_LOCAL_URI: 'mongodb://localhost:27017/easy_rent',
    DB_URI: 'mongodb://localhost:27017/easy_rent',

    STRIPE_API_KEY: '',
    STRIPE_SECRET_KEY: '',

    STRIPE_WEBHOOK_SECRET: '',
    
    CLOUDINARY_CLOUD_NAME: 'sega-soft',
    CLOUDINARY_API_KEY: '',
    CLOUDINARY_API_SECRET: '',
    
    SMTP_HOST: "",
    SMTP_PORT: "",
    SMTP_USER: "",
    SMTP_PASSWORD: "",
    SMTP_FROM_EMAIL: "",
    SMTP_FROM_NAME: "",
},
images: {
  domains: ['res.cloudinary.com'],
}
}
const removeUndefined = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key])) newObj[key] = removeUndefined(obj[key]);
    else if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
};
const next = require('next/dist/lib/is-serializable-props');
const isSerializableProps = next.isSerializableProps;
next.isSerializableProps = (page, method, input) => isSerializableProps(page, method, removeUndefined(input));