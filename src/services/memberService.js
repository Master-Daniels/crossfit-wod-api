const Member = require("../database/Member");

const getAllMembers = () => {
    try {
        const allMembers = Member.getAllMembers();
        return allMembers;
    } catch (error) {
        throw error;
    }
};

const getMember = (memberId) => {
    try {
        const member = Member.getMember(memberId);
        return member;
    } catch (error) {
        throw error;
    }
};

const createMember = (newMember) => {
    const memberToInsert = {
        ...newMember,
        id: uuid(),
    };
    try {
        const createdMember = Member.createNewMember(memberToInsert);
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

const deleteMember = (id) => {
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
