import React, { useState, useEffect } from 'react';
import * as S from './styles.js';

export function Sidebar({ isOpen, onClose, lastUpdate, onRefresh }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Relógio em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const formattedDate = currentTime.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedLastUpdate = lastUpdate
    ? lastUpdate.toLocaleString('pt-BR')
    : 'Nunca atualizado';

  const handleRefresh = async () => {
    if (onRefresh) {
      await onRefresh();
    }
  };

  return (
    <>
      <S.Overlay isOpen={isOpen} onClick={onClose} />
      <S.SidebarContainer isOpen={isOpen}>
        <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        <S.Title>📡 Informações do Sistema</S.Title>

        <S.InfoCard>

          <S.InfoLabel>Horário em tempo real</S.InfoLabel>
          <S.ClockValue>{formattedTime}</S.ClockValue>
          <S.DateValue>{formattedDate}</S.DateValue>
        </S.InfoCard>

        <S.InfoCard>

          <S.InfoLabel>Última atualização dos dados</S.InfoLabel>
          <S.UpdateValue>{formattedLastUpdate}</S.UpdateValue>
          <S.RefreshButton onClick={handleRefresh}>
            Atualizar agora
          </S.RefreshButton>
        </S.InfoCard>

        <S.Footer>
          <S.SenaiBadge>SENAI - Tecnologia que transforma</S.SenaiBadge>
          <p style={{ color: '#6b6b6bbe', marginTop: '20px' }}>© 2026 Isaque Portugal | Turma DDS-4</p>
        </S.Footer>
      </S.SidebarContainer>
    </>
  );
}