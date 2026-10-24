import { BackendUserPayload, UserLanguage, UserProfile } from '../types/auth.types';

export const formatMemberSince = (
  createdAt?: string,
  currentMemberSince?: string
): string => {
  if (!createdAt) {
    return currentMemberSince || 'Reciente';
  }

  try {
    return new Date(createdAt).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
    });
  } catch {
    return currentMemberSince || 'Reciente';
  }
};

export const mapBackendUserToUserProfile = (
  currentUser: UserProfile,
  backendUser: BackendUserPayload
): UserProfile => {
  let nativeLang = currentUser.nativeLanguage;
  let learningLang = currentUser.learningLanguage;
  const learningList: UserLanguage[] = [];

  if (backendUser.userLanguages && backendUser.userLanguages.length > 0) {
    for (const ul of backendUser.userLanguages) {
      const mapped: UserLanguage = {
        code: ul.languageCode,
        name: ul.languageName,
        flag: ul.flagEmoji || '🌐',
        level: ul.cefrLevel || undefined,
        targetLevel: ul.targetLevel || undefined,
        progressPercentage: ul.progressPercentage ?? 0,
      };

      if (ul.type === 'NATIVE') {
        nativeLang = mapped;
      } else {
        learningList.push(mapped);
      }
    }

    if (learningList.length > 0) {
      learningLang = learningList[0];
    }
  }

  return {
    ...currentUser,
    id: backendUser.id,
    name: backendUser.fullName || backendUser.name || currentUser.name,
    email: backendUser.email || currentUser.email,
    phone: backendUser.phone ?? currentUser.phone,
    bio: backendUser.bio ?? currentUser.bio,
    birthDate:
      backendUser.birthDate !== undefined
        ? (backendUser.birthDate ? String(backendUser.birthDate) : null)
        : currentUser.birthDate,
    avatarUrl:
      backendUser.avatar?.url ||
      backendUser.avatarUrl ||
      currentUser.avatarUrl ||
      '',
    countryCode: backendUser.countryCode || currentUser.countryCode,
    countryFlag: backendUser.countryFlag || currentUser.countryFlag,
    isVerified: backendUser.isVerified ?? currentUser.isVerified,
    isAvailableToTeach:
      backendUser.isAvailableToTeach ?? currentUser.isAvailableToTeach,
    earningRatePerMin:
      backendUser.earningRatePerMin ?? currentUser.earningRatePerMin,
    learningCostPerMin:
      backendUser.learningCostPerMin ?? currentUser.learningCostPerMin,
    rating:
      backendUser.rating !== undefined
        ? Number(backendUser.rating)
        : currentUser.rating,
    totalCalls: backendUser.totalCalls ?? currentUser.totalCalls,
    hoursPracticed:
      backendUser.hoursPracticed !== undefined
        ? Number(backendUser.hoursPracticed)
        : currentUser.hoursPracticed,
    reviewCount: backendUser.reviewCount ?? currentUser.reviewCount,
    acceptedTerms: backendUser.acceptedTerms ?? currentUser.acceptedTerms,
    nativeLanguage: nativeLang,
    learningLanguage: learningLang,
    learningLanguagesList:
      learningList.length > 0 ? learningList : currentUser.learningLanguagesList,
    memberSince: formatMemberSince(backendUser.createdAt, currentUser.memberSince),
  };
};
