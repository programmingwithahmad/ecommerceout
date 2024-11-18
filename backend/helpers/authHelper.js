import bcrypt from 'bcrypt';

export const hashpassword = async (password) =>{
    try {
        const saltRounds = 10;
        const hashedpassword = await bcrypt.hash(password, saltRounds);
        return hashedpassword;
    } catch (error) {
        console.log(error);
    }
};

export const comparepassword = async (userpassword, storagehashedpassword) => {
    try {
        const result = await bcrypt.compare(userpassword, storagehashedpassword);
        return result;
    } catch (error) {
        console.log(error);
    }
}