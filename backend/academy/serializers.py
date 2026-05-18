from rest_framework import serializers
from .models import Student, Instructor, Vehicle, Course, Enrollment, Lesson

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class StudentPictureSerializer(serializers.ModelSerializer):
    def validate_profile_picture(self, value):
        # TODO(actividad): Implementar validaciones de archivo (tamano y tipo MIME).
        # Ejemplo: permitir image/jpeg e image/png y limitar a 2MB.
        return value

    class Meta:
        model = Student
        fields = ['profile_picture']

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
    
    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("No se permiten nombres vacios")
        return value
    
    def validate_duration_hours(self, value):
        if value <= 0:
            raise serializers.ValidationError("El numero de horas tiene que ser mayor que 0")
        return value
    
    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("El precio no puede ser menor que 0")
        return value

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'
