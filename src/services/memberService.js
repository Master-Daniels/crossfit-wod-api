const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");

const Member = require("../database/Member");

const getAllMembers = () => {
    try {
        const allMembers = Member.getAllMembers();
        allMembers.forEach((memeber) => {
            delete memeber.password;
        });
        return allMembers;
    } catch (error) {
        throw error;
    }
};

const getMember = (memberId) => {
    try {
        const member = Member.getMember(memberId);
        delete member[0].password;
        return member;
    } catch (error) {
        throw error;
    }
};

const createMember = (newMember) => {
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(newMember?.password, saltRounds);
    const memberToInsert = {
        ...newMember,
        id: uuid(),
        password: passwordHash,
    };
    try {
        const createdMember = Member.createNewMember(memberToInsert);
        delete createdMember[0].password;
        return createdMember;
    } catch (error) {
        throw error;
    }
};

const updateMember = (id, changes) => {
    try {
        const updatedMember = Member.updateMember(id, changes);
        return updatedMember;
    } catch (error) {
        throw error;
    }
};

const deleteMember = (id, password) => {
    try {
        Member.deleteMember(id, password);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllMembers,
    getMember,
    createMember,
    updateMember,
    deleteMember,
};
