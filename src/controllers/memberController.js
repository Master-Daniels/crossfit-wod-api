const memberService = require("../services/memberService");

function getAllMembers(req, res) {
    try {
        const members = memberService.getAllMembers();
        res.status(200).send({ status: "OK", length: members.length, data: members });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

function getMember(req, res) {
    try {
        const { memberId } = req.params;
        if (!memberId) {
            return res
                .status(400)
                .send({ status: "FAILED", data: { error: "Parameter ':workoutId' cannot be empty " } });
        }
        const member = memberService.getMember(memberId);
        res.status(200).send({ status: "OK", length: member.length, data: member });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

function createMember(req, res) {
    const { name, gender, dateOfBirth, email, password } = req.body;
    if (!name || !gender || !dateOfBirth || !email || !password) {
        return res.status(400).send({
            status: "FAILED",
            data: {
                error: "One of the following keys is missing or is empty in request body: 'name', 'gender', 'dateOfBirth', 'email', 'password.",
            },
        });
    }
    try {
        const createdMember = memberService.createMember({ name, gender, dateOfBirth, email, password });
        res.status(201).send({ status: "OK", length: createdMember.length, data: createdMember });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

function updateMember(req, res) {
    const memberId = req.params.memberId;
    if (!memberId) {
        return res.status(400).send({ status: "FAILED", data: { error: "Parameter ':memberId' cannot be empty" } });
    }

    try {
        const updatedMember = memberService.updateMember(memberId, req.body);
        res.status(200).send({ status: "OK", length: updatedMember.length, data: updatedMember });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

function deleteMember(req, res) {
    const { memberId } = req.params;
    const { password } = req.body;
    if (!memberId || !password) {
        return res
            .status(400)
            .send({ status: "FAILED", data: { error: "Parameter ':memberId', ':password' cannot be empty" } });
    }

    try {
        memberService.deleteMember(memberId, password);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

module.exports = {
    getAllMembers,
    getMember,
    createMember,
    updateMember,
    deleteMember,
};
