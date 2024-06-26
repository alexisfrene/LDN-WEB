import React from 'react';
import {
  AdjustmentsVerticalIcon,
  ArrowRightOnRectangleIcon,
  ArrowPathIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CalendarDaysIcon,
  CogIcon,
  ChatBubbleLeftEllipsisIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckCircleIcon,
  CheckIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  CloudArrowUpIcon,
  ClockIcon,
  EnvelopeOpenIcon,
  EyeSlashIcon,
  EllipsisVerticalIcon,
  HomeIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
  SparklesIcon,
  UserGroupIcon,
  UsersIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  IdentificationIcon,
  GlobeAltIcon,
  QueueListIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UserPlusIcon,
  QuestionMarkCircleIcon,
  MegaphoneIcon,
  PhotoIcon,
  BuildingStorefrontIcon,
  Cog6ToothIcon,
  PlusCircleIcon,
  ArrowSmallLeftIcon,
  TrashIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface IconsProps {
  type: IconsType;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
  fill?: string;
}

const icons = {
  alert: ExclamationCircleIcon,
  arrow_back: ChevronLeftIcon,
  arrow_down: ChevronDownIcon,
  arrow_right: ChevronRightIcon,
  arrow_top: ChevronUpIcon,
  arrow_left_start_on_rectangle: ArrowLeftOnRectangleIcon,
  send: PaperAirplaneIcon,
  building: BuildingOfficeIcon,
  close: XMarkIcon,
  check_clean: CheckCircleIcon,
  check: CheckIcon,
  copy_manual: PencilSquareIcon,
  copy_automatic: ClipboardDocumentCheckIcon,
  config: CogIcon,
  dentist: UserGroupIcon,
  document: DocumentTextIcon,
  emailList: EnvelopeOpenIcon,
  ellipsis_vertical: EllipsisVerticalIcon,
  file_broken: EyeSlashIcon,
  globe: GlobeAltIcon,
  help: InformationCircleIcon,
  home: HomeIcon,
  holidays: SparklesIcon,
  identification: IdentificationIcon,
  knob: AdjustmentsVerticalIcon,
  logout: ArrowRightOnRectangleIcon,
  list: ClipboardDocumentListIcon,
  queue: QueueListIcon,
  question: QuestionMarkCircleIcon,
  refresh: ArrowPathIcon,
  schedule: CalendarIcon,
  search: MagnifyingGlassIcon,
  sms: ChatBubbleLeftEllipsisIcon,
  specialty: ClipboardDocumentIcon,
  today: ClockIcon,
  user: UsersIcon,
  upload: CloudArrowUpIcon,
  weekly: CalendarDaysIcon,
  warning: ExclamationTriangleIcon,
  statistics: ChartBarIcon,
  trending_up: ArrowTrendingUpIcon,
  userplus: UserPlusIcon,
  megaphone: MegaphoneIcon,
  photo: PhotoIcon,
  store: BuildingStorefrontIcon,
  cog_6_tooth: Cog6ToothIcon,
  plus_circle: PlusCircleIcon,
  arrow_small_left: ArrowSmallLeftIcon,
  trash: TrashIcon,
};
export type IconsType = keyof typeof icons;
export const Icons: React.FC<IconsProps> = ({
  type,
  width,
  height,
  className,
  onClick,
  fill = 'transparent',
}) => {
  const Icon = icons[type];

  return (
    <Icon
      width={width}
      height={height}
      className={className}
      fill={fill}
      onClick={onClick}
    />
  );
};
