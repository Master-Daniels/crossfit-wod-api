const bcrypt = require("bcrypt");

const { saveToDatabase, DB } = require("./utils");

const getAllMembers = () => {
    try {
        const members = DB.members;
        return members;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const createNewMember = (newMember) => {
    const isAlreadyAdded = DB.members.findIndex((member) => member.email === newMember.email) > -1;
    if (isAlreadyAdded) {
        throw {
            status: 404,
            message: `Member with same details already exists`,
        };
    }

    try {
        DB.members.push(newMember);
        saveToDatabase(DB);
        return [newMember];
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const getMember = (memberId) => {
    try {
        const member = DB.members.find((member) => member.id === memberId);
        if (!member) throw { status: 400, message: "member with memberId: {" + memberId + "} not found" };
        return [member];
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updateMember = (memberId, changes) => {
    try {
        if (!changes) throw { status: 400, message: "No data in Request body" };

        const memberIndex = DB.members.findIndex((member) => member.id === memberId);
        if (memberIndex < 0) throw { status: 404, message: "Member with memberId: ' " + memberId + " ' not found" };

        const isAlreadyAdded = DB.members.findIndex((member) => member.email === changes.email) > -1;
        if (isAlreadyAdded) throw { status: 400, message: "Member with same details already exists." };

        const memberInDB = DB.members[memberIndex];
        if (!bcrypt.compareSync(changes.password, memberInDB.password))
            throw { status: 400, message: "Incorrect Password supplied for member. Check password and try again" };

        const memberToUpdate = {
            ...DB.members[memberIndex],
            ...changes,
        };
        DB.members[memberIndex] = memberToUpdate;
        saveToDatabase(DB);
        return memberToUpdate;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const deleteMember = (memberId, password) => {
    try {
        const memberIndex = DB.members.findIndex((member) => member.id === memberId);
        if (memberIndex < 0) throw { status: 400, message: "Member with memberId:" + memberId + "not found" };

        const memberInDB = DB.members[memberIndex];
        if (!bcrypt.compareSync(password, memberInDB.password))
            throw { status: 400, message: "Incorrect Password supplied for member. Check password and try again" };

        DB.members.splice(memberIndex, 1);
        saveToDatabase(DB);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = {
    getAllMembers,
    getMember,
    createNewMember,
    updateMember,
    deleteMember,
};
