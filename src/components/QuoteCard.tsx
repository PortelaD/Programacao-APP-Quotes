import React from 'react';
import { View, Text, Image } from 'react-native';

export interface Quote {
  id: number;
  author: string;
  quote: string;
  image: string;
}


interface QuoteCardProps {
  quoteData: Quote;
}

export default function QuoteCard({ quoteData }: QuoteCardProps) {
  const { author, quote, image } = quoteData;

  return (
    <View className="bg-white p-4 rounded-lg shadow-lg items-center">
      <Image source={{ uri: image }} className="w-24 h-24 rounded-full mb-4" />
      <Text className="text-lg font-semibold text-gray-800 mb-2 text-center">{quote}</Text>
      <Text className="text-gray-600">- {author}</Text>
    </View>
  );
}
