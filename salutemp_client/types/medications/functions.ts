import colors from '../../config/colors';
import { MedOverviewTypeEnum, Status } from './types';

export function getStatusColors(status: Status) {
  let cardStatusColor = { main: colors.black, side: colors.black };
  switch (status) {
    case Status.Good: {
      cardStatusColor = { main: colors.green, side: colors.darkGreen };
      break;
    }
    case Status.Warning: {
      cardStatusColor = { main: colors.yellow, side: colors.darkYellow };
      break;
    }
    case Status.Bad: {
      cardStatusColor = { main: colors.red, side: colors.darkRed };
      break;
    }
  }

  return cardStatusColor;
}

export function getMedOverviewTypeSymbol(type: MedOverviewTypeEnum) {
  switch (type) {
    case MedOverviewTypeEnum.Temperature:
      return '°';
    case MedOverviewTypeEnum.Humidity:
      return '%';
    case MedOverviewTypeEnum.Light:
      return 'ᴸ';
  }
}
