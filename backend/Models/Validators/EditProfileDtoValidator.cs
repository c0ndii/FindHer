using FluentValidation;
namespace Find_H_er.Models.Validators
{
    public class EditProfileDtoValidator : AbstractValidator<EditProfileDto>
    {
        public EditProfileDtoValidator()
        {
            RuleFor(x => x.Name)
                .Cascade(CascadeMode.Stop)
                .MaximumLength(20)
                .NotEmpty();
            RuleFor(x => x.Description)
                .Cascade(CascadeMode.Stop)
                .NotEmpty()
                .MaximumLength(100);
            RuleFor(x => x.Age)
                .Cascade(CascadeMode.Stop)
                .InclusiveBetween(18, 100)
                .NotEmpty();
            RuleFor(x => x.Sex)
            .Cascade(CascadeMode.Stop)  
                .NotEmpty();
        }
    }
}
