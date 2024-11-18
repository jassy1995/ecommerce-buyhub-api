import { google } from 'googleapis';
// import UserService from './user';
// import FileService from './file';

const AuthService = {
  async getGoogleUserInfo(accessToken: string) {
    const client = new google.auth.OAuth2();
    client.setCredentials({ access_token: accessToken });
    const oauth2 = google.oauth2({ version: 'v2', auth: client });
    return new Promise<any>((resolve, reject) => {
      oauth2.userinfo.get((err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response?.data);
        }
      });
    });
  },
  isValidGooglePayload(payload: any) {
    return (
      payload &&
      payload.given_name &&
      payload.id &&
      payload.email &&
      typeof payload.verified_email === 'boolean'
    );
  },
  async createUserFromGooglePayload(payload: any) {
    console.log(payload);
    //  ' const user = await UserService.create({
    //     fullName: payload.given_name,
    //     // lastName: payload.family_name || undefined,
    //     username: payload.email.split('@')[0],
    //     googleId: payload.id,
    //     email: payload.email,
    //   });'
    // user.verification = user.verification ?? { email: false, phone: false };
    // user.verification.email = payload.verified_email;
    // await user.save();
    // if (payload.picture) {
    //   const buffer = await FileService.getImageBufferFromLink(payload.picture);
    //   const file = { buffer, mimetype: 'image/jpeg' } as Express.Multer.File;
    //   user.image = await FileService.upload(file, `users/${user._id.toString()}`);
    // }
    // await user.save();
    // return user;
  },
  async updateUserLastLogin(user: any) {
    user.lastLogin = new Date();
    await user.save();
  },
};

export default AuthService;
