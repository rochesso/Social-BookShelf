import usersCollection from './users.mongo';

const addUser = async (user: User) => {
    await usersCollection.findOneAndUpdate(
        {
            id: user.id,
        },
        user,
        {
            upsert: true,
        }
    );
};

export {
    addUser
};