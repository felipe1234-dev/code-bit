import { UsersDatabase } from "api/databases";
import { codes } from "api/constants";
import { User } from "api/models";
import { Hash, auth, storage } from "api/utils/services";
import { validateEmail } from "api/utils/functions";

interface UserCustomData extends Omit<Partial<User>, "photo"> {
    photo?: File;
}

async function registerUser(
    email: string,
    password: string,
    confirmPassword: string,
    customData: UserCustomData = {}
) {
    const { firstName, lastName, photo: photoFile, ...rest } = customData;
    const usersDB = new UsersDatabase();

    const emailIsValid = validateEmail(email);
    if (!emailIsValid) throw new Error(codes.auth.invalidEmail);
    if (!password) throw new Error(codes.auth.passwordRequired);
    if (password !== confirmPassword)
        throw new Error(codes.auth.wrongConfirmPassword);
    if (!firstName) throw new Error(codes.auth.missingFirstName);
    if (!lastName) throw new Error(codes.auth.missingLastName);

    const emailInUse = !!(await usersDB.getByEmail(email));
    if (emailInUse) throw new Error(codes.auth.emailAlreadyTaken);

    const salt = Hash.generateSalt();
    const hashedPassword = await Hash.create(password, salt);
    const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
    );
    const authId = userCredential.user?.uid;
    if (!authId) throw new Error(codes.auth.unknownError);

    const user = new User({
        ...rest,
        firstName,
        lastName,
        hashedPassword,
        salt,
        email,
        authId,
    });

    if (photoFile) {
        const ref = storage.ref(`users/${user.uid}/photos/${photoFile.name}`);
        await ref.put(photoFile);

        const photoUrl = await ref.getDownloadURL();
        user.photo = photoUrl;
    }

    await usersDB.uid(user.uid).create(user);

    return user;
}

export default registerUser;
export { registerUser };
