///* global Proxy */
import get from 'lodash/get';
export default class Profile {
    constructor(userData) {
        this.about_me = get(userData, 'profile.experience');
        this.id = get(userData, 'id') || get(userData, 'master_id');
        this.avatar = userData.avatar;
        this.big_avatar = userData.big_avatar || userData.avatar;
        this.firstName = userData.first_name;
        this.lastName = userData.last_name;
        this.rating = userData.user_rating || userData.rating;
        this.phone = userData.phone;
        this.userStatus = userData.is_master ? 'Мастер' : 'Клиент';
        this.parentSkills = userData.parent_skills;
        this.skills = Array.isArray(userData.skills)
            ? userData.skills.map(item => {
                  return {
                      ...item,
                      from: get(item, 'pivot.from'),
                      to: get(item, 'pivot.to'),
                  };
              })
            : [];
        this.initialSkills = this.skills.map(item => item.id);
        this.lat = get(userData, 'address.lat', '0');
        this.lng = get(userData, 'address.lng', '0');
        this.lat = this.lat === 'null' ? '0' : this.lat;
        this.lng = this.lng === 'null' ? '0' : this.lng;
        this.userData = userData;
        this.location = get(userData, 'address.city');
        this.isMaster = Boolean(get(userData, 'is_master', false));
        this.isAdmin = Boolean(get(userData, 'is_admin', false));
        this.salonId = Boolean(get(userData, 'salon_id', false));
        this.enableDeparture = Boolean(get(userData, 'profile.is_work_at_client', false));
        this.workFromHome = Boolean(get(userData, 'profile.is_work_from_home', false));
        this.address = get(this.userData, 'address', {}) || {};
        this.work_time_non_prepared = get(userData, 'working_time', {});
        this.working_time_intervals = get(userData, 'working_time_intervals', {});
        this.workingTimeInterval = get(userData, 'profile.working_time_interval', false);
    }

    get portfolio() {
        let portfolio = get(this.userData, 'portfolio', []);
        let result = [];
        portfolio.forEach(item => {
            if (item.images.length > 0) {
                result.push({
                    title: item.title,
                    ...item.images,
                    tags: item.tags,
                    id: item.id,
                });
            }
        });
        return result;
    }

    get workTime() {
        const workTime = get(this.userData, 'working_time_intervals', {});
        const result = {};
        for (let day in workTime) {
            if (workTime.hasOwnProperty(day)) {
                let data = workTime[day];
                result[day] = getLinesOfWork(data !== null ? data : []);
            }
        }

        return result;
        function getLinesOfWork(tempArr) {
            const reducer = (accumulator, currentValue, index) => {
                return (
                    accumulator +
                    `${index > 0 ? ' / ' : ''}${currentValue.start} - ${currentValue.end}`
                );
            };
            return tempArr.reduce(reducer, '');
        }
    }

    get backgroundColor() {
        return this.isMaster ? `-${get(this, 'skills[0].parent_uid', 'default')}` : '-default';
    }
    getBackgroundColorBySkills(skills, skillsList) {
        const commonSlills = skillsList.reduce((acc, item) => [...acc, ...item.sub_skills], []);
        const skill = skills.length > 0 && commonSlills.find(item => item.id == skills[0]);

        return skills.length > 0
            ? `-${get(skill, 'parent_uid', 'default')}`
            : `-${get(this, 'skills[0].parent_uid', 'default')}`;
    }

    prepareFeedback(feedbacks) {
        let arr = undefined;
        if (Array.isArray(feedbacks)) {
            arr = feedbacks.map(item => {
                return {
                    firstName: item.avtorName,
                    lastName: '',
                    rating: item.rating,
                    date: item.feedbackDate,
                    text: item.text,
                    avatar: item.avtorAvatar,
                    id: item.avtorId,
                };
            });
        }
        return arr;
    }
}
