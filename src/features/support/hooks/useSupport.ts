import { useState } from 'react';
import { goBack } from '@/navigation/NavigationRef';

export const useSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleOpenTopic = (topicId: string) => {
    setActiveTopicId(topicId);
  };

  const handleCloseTopic = () => {
    setActiveTopicId(null);
  };

  const handleOpenContact = () => {
    setIsContactSheetOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactSheetOpen(false);
  };

  const handleBack = () => {
    goBack();
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    handleSelectCategory,
    activeTopicId,
    handleOpenTopic,
    handleCloseTopic,
    isContactSheetOpen,
    handleOpenContact,
    handleCloseContact,
    handleBack,
  };
};
