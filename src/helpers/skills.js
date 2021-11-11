export const getSalonsSkills = (skills, skillsSalon) => {
    return skills
        .reduce((acc, i) => {
            return [
                ...acc,
                {
                    ...i,
                    sub_skills: i.sub_skills.filter(sub =>
                        skillsSalon.find(skill => {
                            return skill.id == sub.id;
                        })
                    ),
                },
            ];
        }, [])
        .filter(i => i.sub_skills.length > 0);
};
export const getAllSkills = skills => {
    return skills.reduce((acc, item) => [...acc, ...item.sub_skills], []);
};
