import { PureComponent } from 'react';
import moment from 'moment';
import ruLocale from 'moment/locale/ru';

class MomentContainer extends PureComponent {
  componentDidMount() {
    moment.locale('ru', ruLocale);
  }

  render() {
    return null;
  }
}

export default MomentContainer;
