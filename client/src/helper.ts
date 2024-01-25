export const errorByKey = (errors: any, key: any) => {
  if(errors?.length && key?.length) {
    const err = errors.find((e: any) => e.hasOwnProperty(key));
    if(err) {
      return err[key];
    }
  }
  return null;
};