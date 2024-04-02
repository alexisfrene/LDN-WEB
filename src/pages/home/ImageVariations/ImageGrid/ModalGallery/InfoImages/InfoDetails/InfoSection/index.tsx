import React, { useEffect, useRef, useState } from 'react';
import { Icons, Input, Separator } from '@/components';

type InfoSectionProps = {
  label: string;
  value: string;
  onSubmit: (value: string) => void;
};

export const InfoSection: React.FC<InfoSectionProps> = ({
  label,
  value,
  onSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (value: string) => {
    // Aquí puedes realizar la lógica para guardar el valor editado
    try {
      await onSubmit(value);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <>
      <div className="w-full flex justify-between my-3 text-base">
        <p className="w-36 h-10">{label} :</p>
        {isEditing ? (
          <>
            <Input
              type="text"
              placeholder={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              className="w-96 text-base h-10"
              ref={inputRef}
            />
            <Icons
              type="check"
              onClick={() => handleSaveClick(editedValue)}
              className="text-slate-300 hover:text-slate-400 w-7 cursor-pointer"
            />
          </>
        ) : (
          <>
            <div className="w-96 py-2 px-3 h-10">{value}</div>
            <Icons
              type="cog_6_tooth"
              className="text-slate-300 hover:text-slate-400 w-8 cursor-pointer"
              onClick={handleEditClick}
            />
          </>
        )}
      </div>
      <Separator />
    </>
  );
};
