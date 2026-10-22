export interface SupportCategory {
  id: string;
  name: string;
  icon: string;
}

export interface FeaturedTopic {
  id: string;
  titleKey: string;
  subtitleKey: string;
  iconName: 'CreditCard' | 'Video' | 'User';
  iconBgColor: string;
  iconColor: string;
}

export interface FaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}
