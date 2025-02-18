//console.log(import.meta.env.VITE_APP_API_URL)
const apiUrl = import.meta.env.VITE_APP_API_URL;
const wbURL = import.meta.env.VITE_WHATSAPP_URL;
const instaURL = import.meta.env.VITE_INSTAGRAM_URL;
const fbURL = import.meta.env.VITE_FACEBOOk_URL;
const twitterURL = import.meta.env.VITE_TWITTER_URL;
const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;
const address = import.meta.env.VITE_ADDRESS_URL;
const linkdin = import.meta.env.VITE_LINKEDIN_URL;
const email = import.meta.env.VITE_EMAIL;
const aws = import.meta.env.VITE_APP_AWS_URL;

const config = {
  // apiUrl:'http://localhost:8000',
  apiUrl: apiUrl,
  instagram: instaURL,
  whatsapp: wbURL,
  facebook: fbURL,
  twitter: twitterURL,
  phonenumber: "022 48808546",
  address: address,
  linkdin: linkdin,
  email: "info@instaowl.in",
  aws: aws,

  s3url: function (file) {
    let filename = file.split(".").reverse().pop();
    let path = "/assets/" + filename + "/HLS/" + filename + ".m3u8";
    return aws + path;
  },
  s3urlThumbnail: function (file) {
    let filename = file.split(".").reverse().pop();
    let path =
      "/assets/" + filename + "/Thumbnails/" + filename + ".0000000" + ".jpg";
    return aws + path;
  },
};
export default config;
