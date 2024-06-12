export const JWTKeyData = (Data: any) => {
  console.log('Data', Data);
  return {
    id: Data?.id,
    username: Data?.username,
    email: Data?.email,
  }
}