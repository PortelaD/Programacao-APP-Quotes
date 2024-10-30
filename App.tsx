import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { api } from './src/services/api/api';
import QuoteCard from './src/components/QuoteCard';
import { Quote } from './src/components/QuoteCard';

export default function App() {
  const [quoteData, setQuoteData] = useState<Quote | null>(null);  // Tipando o estado
  const [loading, setLoading] = useState<boolean>(false);  // Estado booleano para loading

  // Função para buscar a citação
  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await api.get<Quote[]>('/quotes');  // Tipando a resposta da API
      const randomQuote = response.data[Math.floor(Math.random() * response.data.length)];
      setQuoteData(randomQuote);
    } catch (error) {
      console.error('Erro ao buscar a citação:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para resetar o estado
  const resetApp = () => {
    setQuoteData(null);
    setLoading(false);
  };

  // Fetch inicial de citação
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        quoteData && (
          <QuoteCard quoteData={quoteData} />
        )
      )}

      {/* Botão para buscar uma nova citação */}
      <TouchableOpacity
        onPress={fetchQuote}
        className="mt-6 bg-blue-500 px-4 py-2 rounded-lg"
      >
        <Text className="text-white text-lg">Nova Citação</Text>
      </TouchableOpacity>

      {/* Botão para resetar o app */}
      {quoteData && (
        <TouchableOpacity
          onPress={resetApp}
          className="mt-4 bg-red-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white text-lg">Resetar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
